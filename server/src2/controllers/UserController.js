const userService = require('../services/UserService');

class UserController {
    async registration(req, res, next) {
        try {
            const {nickname, email, password} = req.body;
            const userData = await userService.registration(nickname, email, password);
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true});
            return res.json(userData);
        } catch (e) {
            console.log(e);
        }
    };

    login(req, res, next) {
    };

    logout(req, res, next) {
    };

    async activate(req, res, next) {
        try {
            const activationLink = req.params.link;
            await userService.activate(activationLink);
            return res.redirect(process.env.CLIENT_URL);
        } catch (e) {
            console.log(e)
        }
    };

    refresh(req, res, next) {
    };

    getUsers(req, res, next) {
    }
}

module.exports = new UserController();