const bcryptjs = require('bcrypt');

const encrypt = async (plainText) => {
    const hash = await bcryptjs.hash(plainText, 10);
    return hash;
};

const compare = async (plainText, hash) => {
    return await bcryptjs.compare(plainText, hash);
};

module.exports = { encrypt, compare };
