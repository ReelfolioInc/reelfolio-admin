const jwt = require('jsonwebtoken');

const generateAccessToken = async (userId,role) => {
    let token = await jwt.sign({
        data: {
            userId,
            role
        }
    },process.env.JWT_ACCESS_TOKEN_SECRET,{expiresIn: '1h',issuer: "reelfolio-backend"});
    return token;
};

const generatePasswordResetToken = async (userId) => {
    let token = await jwt.sign({
        data: {
            userId
        }
    },process.env.JWT_PASSWORD_RESET_SECRET,{expiresIn: '1d',issuer: "reelfolio-backend"});
    return token;
};

const decodePasswordResetToken = async (token) => {
    let decoded = await jwt.verify(token,process.env.JWT_PASSWORD_RESET_SECRET,{algorithm:"HS256"});
    return decoded;
};

const decodeAccessToken = async (token) => {
    let decoded = await jwt.verify(token,process.env.JWT_ACCESS_TOKEN_SECRET,{algorithm:"HS256"});
    return decoded;
};

module.exports = {
    generateAccessToken,
    decodeAccessToken,
    generatePasswordResetToken,
    decodePasswordResetToken
};