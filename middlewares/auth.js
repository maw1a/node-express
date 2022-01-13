// Verify the JWT
const jwt = require("jsonwebtoken");

exports.auth = async (req, res, next) => {
  const token = req.headers.authorization.split(" ").pop();
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);

    req.user = payload;

    next();
  } catch (err) {
    return res.status(304).json({
      message: "Invalid token",
      data: {},
      success: false,
    });
  }
};
