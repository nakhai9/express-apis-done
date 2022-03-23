const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.isAuthorization = (req, res, next) => {
  // https://anonystick.com/blog-developer/bearer-token-la-gi-neu-khong-co-bearer-truoc-token-2021052140045637

  // Step 1: Get token stored in authorization
  const token = req.headers["authorization"].split(" ")[1];

  if (!token) {
    return resizeBy.status(403).json({
      error: "No find access token.",
    });
  }

  // Step 2: Decoded token
  const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

  // Step 3: truyền lên req một biến sau đó truy cập biến đó thông qua req
  req.user_id = decoded.id;

  next();
};
