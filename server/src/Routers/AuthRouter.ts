const {register, login} = require('../controllers/authController');
const {check} = require('express-validator');
const {Router} = require('express');
const authRouter = new Router();

authRouter.post('/registration',
    [
        check('email', 'incorrect email').isEmail(),
        check('password', 'password length should be more then 8 and more then 16').isLength({min: 8, max: 16})
    ],
    register
    )

authRouter.post('/login', login);

module.exports = authRouter;
