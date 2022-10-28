// this is authentication process to decide if user have a valid token or not
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const dotenv = require("dotenv");
dotenv.config();

// verify token function
async function auth(req, res, next) {
  const rawToken = req.headers.authorization;
  console.log(rawToken);
  try {
    if (
      rawToken === "Bearer" ||
      !rawToken ||
      rawToken === "Bearer undefined" ||
      JSON.stringify(rawToken) === "{}"
    ) {
      throw new Error("Anoymouns user");
    }
    const token = rawToken.split(" ")[1].trim();
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findByEmail(decodedToken.email);
    if (!user) throw new Error("Anoymouns user");
    req.currentUser = decodedToken;
    next();
  } catch (e) {
    console.log(e.message);
    res.status(401).json({
      message: "Unauthorized, no access please login to your account",
    });
  }
}

module.exports = auth;
