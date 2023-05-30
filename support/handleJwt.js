const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES = process.env.JWT_EXPIRES;

const sign = (payload) => {
    const token = jwt.sign(
        payload,
        JWT_SECRET,
        {
            expiresIn: JWT_EXPIRES,
        }
    );

    return token;
};

const verify = (token) => {
    try {
        return jwt.verify(token, JWT_SECRET);
    } catch (error) {
        return null;
    }
};

module.exports = { sign, verify };
