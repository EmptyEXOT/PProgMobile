const jwt = require('jsonwebtoken');
const tokenModel = require('../models/Token');

class TokenService {
    public generateTokens(payload: any) {
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_TOKEN, {expiresIn: '30m'});
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_TOKEN, {expiresIn: '30d'});
        return {
            accessToken,
            refreshToken
        }
    }

    public async saveToken(userID: any, refreshToken: any) {
        const tokenData = await tokenModel.findOne({user: userID});
        if (tokenData) {
            tokenData.refreshToken = refreshToken;
            return tokenData.save()
        }
        const token = await tokenModel.create({user: userID, refreshToken})
        return token;
    }
}

export = new TokenService();