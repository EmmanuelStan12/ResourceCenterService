const crypto = require('crypto')

module.exports.validatePassword = (password) => {
    const regex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/;
    return regex.test(password);
}

module.exports.hashPassword = (password) => {

    const salt = crypto.randomBytes(32).toString('hex');
    const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha256').toString('hex');
    return { salt, hash };
}

module.exports.isPasswordValid = (password, hash, salt) => {
    const verifyHash = crypto
        .pbkdf2Sync(password, salt, 1000, 64, "sha256")
        .toString("hex");
    return hash === verifyHash;
}