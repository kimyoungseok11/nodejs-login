const userModel = require('../models/userModel');

module.exports = async (req, res, next) => {
    if (!req.session || !req.session.userId) {
        return res.status(401).json({ message: 'not logged in' });
    }

    const user = await userModel.findById(req.session.userId);
    if (!user) {
        return res.status(401).json({ message: 'invalid session' });
    }

    // ⭐ 로그인 사용자 주입
    req.user = user;
    next();
};
