const bcrypt = require('bcrypt');
const userModel = require('../models/userModel');

exports.signup = async ({ email, password, name }) => {
    const exists = await userModel.findByEmail(email);
    if (exists) {
        throw new Error('email already exists');
    }

    const hashed = await bcrypt.hash(password, 10);

    await userModel.save({
        email,
        password: hashed,
        name,
    });
};

exports.login = async ({ email, password }) => {
    const user = await userModel.findByEmail(email);
    if (!user) {
        throw new Error('login failed');
    }

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) {
        throw new Error('login failed');
    }

    return user; // id, email 포함
};
