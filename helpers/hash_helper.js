const bcrypt = require('bcrypt');

async function hashHelper(password) {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashed = await bcrypt.hash(password, salt);
        return hashed;
    } catch (error) {
        throw error
    }
}

module.exports = {
    hashHelper,
};