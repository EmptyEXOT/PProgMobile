const jwt = require('jsonwebtoken');
require('dotenv').config();

const generateAccessToken = (payload:any) => {
    return jwt.sign(payload, process.env.SECRET_KEY, {expiresIN: '1h'});
}

export {
    generateAccessToken
}