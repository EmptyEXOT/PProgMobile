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

    public login(req:any, res:any, next:any) {
    };

    public logout(req:any, res:any, next:any) {
    };

    public async activate(req:any, res:any, next:any) {
        try {
            const activationLink = req.params.link;
            await userService.activate(activationLink);
            return res.redirect(process.env.CLIENT_URL);
        } catch (e) {
            console.log(e)
        }
    };

    public refresh(req:any, res:any, next:any) {
    };

    public getUsers(req:any, res:any, next:any) {
    }
}

module.exports = new UserController();