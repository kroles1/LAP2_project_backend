// this is authentication process to decide if user have a valid token or not
const jwt = require("jsonwebtoken");
const User = require('../models/User')
const dotenv = require("dotenv");
dotenv.config();

// verify token function
async function auth(req, res, next) {
  const rawToken = req.headers.authorization;
  // console.log(req.headers);
  // console.log(req.body);
  // console.log("rowToken \n ", rawToken);
  try {
    if (
      rawToken === "Bearer" ||
      !rawToken ||
      rawToken === "Bearer undefined" ||
      JSON.stringify(rawToken) === "{}"
    )
      {
        // console.log("error token");
        throw new Error("Anoymouns user");
      }
    const token = rawToken.split(" ")[1].trim();
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    // console.log("decoded token \n",decodedToken);
    // console.log(decodedToken.email);
    const user = await User.findByEmail(decodedToken.email);
    // console.log(user);
    if (!user) throw new Error("Anoymouns user");
    // console.log("decoded token", decodedToken)
    req.currentUser = decodedToken;
    // req.currentUser = decodedToken
    // console.log(req.currentUser)
    next();
  } catch (e) {
    console.log(e.message);
    res.status(401).json({
      message: "Unauthorized, no access please login to your account",
    });
  }
}

module.exports = auth;
