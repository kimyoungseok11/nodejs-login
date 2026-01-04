const authService = require("../services/authService");

exports.signup = async (req, res) => {
  try {
    const { email, password, name } = req.body;

    await authService.signup({ email, password, name });

    res.status(201).json({ message: "signup success" });
  } catch (err) {
    console.error("[SIGNUP ERROR]", err);

    res.status(400).json({
      message: err.message || "signup failed",
    });
  }
};

exports.login = async (req, res) => {
  try {
    const user = await authService.login(req.body);

    // ⭐ 세션에는 PK만 저장
    req.session.userId = user.id;

    res.json({ message: "login success" });
  } catch (err) {
    console.error("[LOGIN ERROR]", err);

    res.status(401).json({
      message: err.message || "login failed",
    });
  }
};

exports.me = async (req, res) => {
  res.json(req.user);
};

exports.logout = (req, res) => {
  req.session.destroy(() => {
    res.json({ message: "logout success" });
  });
};
