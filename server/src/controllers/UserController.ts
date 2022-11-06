const userService = require('../services/UserService');

class UserController {
    public async registration(req: any, res: any, next: any) {
        try {
            const {email, password} = req.body;
            const userData = await userService.registration(email, password);
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true});
            return res.json(userData);
        } catch (e) {
            console.log(e);
        }
    };

    public login() {
    };

    public logout() {
    };

    public activate() {
    };

    public refresh() {
    };

    public getUsers() {
    }
}

module.exports = new UserController();