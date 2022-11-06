const userModel = require('../models/User');
const bcrypt = require('bcrypt');
const uuid = require('uuid')
const mailService = require('./MailService');
const tokenService = require('./TokenService');
const UserDTO = require('../dtos/UserDTO')

class UserService {
    async registration(email, password) {
        const candidate = await userModel.findOne({email}); //Поиск юзера с переданным мейлом
        if (candidate) throw new Error('user with such email already exist'); //Если он есть, то бросаем ошибку
        const hashPassword = await bcrypt.hash(password, 7); //если нет - хешируем переданный пароль
        const activationLink = uuid.v4(); // создаем активационную ссылку

        const user = await userModel.create({email, password: hashPassword, activationLink}); //созаем юзера
        await mailService.sendActivationLink(email, `${process.env.API_URL}api/activate/${activationLink}`); //отправляем активационную ссылку

        const userDTO = new UserDTO(user); //создаем объект, который будет передан как payload
        const tokens = tokenService.generateTokens({...userDTO}); //генерируем для юзера refresh token и accessToken
        await tokenService.saveToken(userDTO.id, tokens.refreshToken); //сохраняем refresh token в БД (с сылкокой)

        return {...tokens, user: userDTO}; //возвращаем юзеру пару токенов + ДТО
    }

    async activate(activationLink) {
        const user = await userModel.findOne({activationLink});
        if (!user) throw new Error('Incorrect link');
        user.isActivated = true;
        user.save();
    }
}

module.exports = new UserService();