const userModel = require('../models/User');
const bcrypt = require('bcrypt');
const uuid = require('uuid')
const mailService = require('./MailService');
const tokenService = require('./TokenService');
const UserDTO = require('../dtos/UserDTO')

class UserService {
    public async registration(email:string, password:string) {
        const candidate = await userModel.findOne({email});
        if (candidate) throw new Error('user with such email already exist');
        const hashPassword = await bcrypt.hash(password, 7);
        const activationLink = uuid.v4();

        const user = await userModel.create({email, password: hashPassword, activationLink});
        await mailService.sendActivationLink(email, `${process.env.API_URL}api/activate/${activationLink}`);

        const userDTO = new UserDTO(user);
        const tokens = tokenService.generateTokens(userDTO);
        await tokenService.saveToken(userDTO.id, tokens.refreshToken);

        return {...tokens, userDTO}
    }
}