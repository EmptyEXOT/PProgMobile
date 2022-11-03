require('dotenv').config();
const bcrypt = require('bcryptjs');
const {check, validationResult} = require('express-validator');
const mongoose = require('mongoose');

const {Router} = require('express');
const authRouter = new Router();

const userSchema = new mongoose.Schema({
    email: String,
    password: String,
})

authRouter.post('/registration',
    [
    check('email', 'incorrect email').isEmail(),
    check('password', 'password length should be more then 8 and more then 16').isLength({min: 8, max: 16})
    ],
    async (req:any, res:any) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json({message: 'incorrect request', errors});

        const {email, password} = req.body;

        const User = mongoose.model("User", userSchema);
        const tempUser = await User.findOne({email});

        if (tempUser) return res.status(400).json({message: `user with email ${email} already exist`});

        const hashPassword = await bcrypt.hash(password, 15);
        const user = await new User({email, password: hashPassword});

        await user.save();

        return res.json({message: 'user has been created'});
    } catch (e) {
        console.log(e);
        res.send({message: 'server error'})
    }
})

module.exports = authRouter;

