const { userDB } = require("../controllers/registerController");
const jwt = require("jsonwebtoken");

const verifyJWT = (req, res, next) => {
  // const person = req.body.name;
  // const foundUser = userDB.users.find((user) => user.username === person);

  // During Log-in , user gets accesstoken , front-end dev needs to put this accesstoken inside "Authorization" headers in order to catch and match token
  const autHeader = req.headers.authorization || req.headers.Authorization;

  if (!autHeader)
    res.json({ message: "There is no accesstoken in relevant place" });

  const token = autHeader.split(" ")[1];
  console.log("req header investigation", req.headers);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) return res.sendStatus(403);

    req.user = decoded.UserInfo.username;
    req.roles = decoded.UserInfo.roles;
    next();
  });
};

module.exports = verifyJWT;
