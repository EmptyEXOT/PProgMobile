require('dotenv').config();
const {validationResult} = require('express-validator');
const {getUserByEmail, createNewUser, checkUserPassword} = require('../models/UserModel');
const {generateAccessToken} = require('../utils/GenerateAccessToken')

const register = async (req: any, res: any) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json({message: 'incorrect request', errors});
        const {email, password} = req.body;
        const candidate = await getUserByEmail(email);
        if (candidate) return res.status(400).json({message: `user with email ${email} already exist`});
        await createNewUser(email, password);
        return res.json({message: 'user has been created'});
    } catch (e) {
        console.log(e);
        res.send({message: 'server error'})
    }
}

const login = async (req: any, res: any) => {
    try {
        const {email, password} = req.body;
        const user = await getUserByEmail(email);
        if (!user) res.status(404).json({message: 'user not found'});

        if (!checkUserPassword(user, password)) res.status(400).json({message: 'incorrect password'});

        const token = generateAccessToken({user});
        return res.json({
            token,
            user: {
                id: user.id,
                email: user.email,
            }
        })
    } catch (e) {
        console.log(e);
        res.send({message: 'server error'})
    }
}

export {
    register,
    login
}