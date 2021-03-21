const bcrypt = require('bcrypt');
const SALT_ROUNDS = 10;

const hashPassword = async (plaintextPassword) => {
    return bcrypt.hash(plaintextPassword, SALT_ROUNDS);
};

const verifyPassword = async (plaintextPassword,hashedPassword) => {
    return bcrypt.compare(plaintextPassword,hashedPassword);
};

module.exports = {
    hashPassword,
    verifyPassword
};