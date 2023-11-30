require("dotenv").config();
const jwt = require("jsonwebtoken");
const { userDB } = require("./registerController");

const handleRefreshToken = (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(401);
  console.log(cookies.jwt);

  const refreshToken = cookies.jwt;

  const foundUser = userDB.users.find(
    (person) => person.refreshtoken === refreshToken
  );

  const roles = Object.values(foundUser.roles);

  if (!foundUser) res.sendStatus(403);

  //evaluate jwt

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
    console.log("decoded: ", decoded);
    if (err || foundUser.username !== decoded.username)
      return res.sendStatus(403);
    // if resfreshtoken is verified , we give new accesstoken
    const accesstoken = jwt.sign(
      { UserInfo: { username: foundUser.username, roles: roles } },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "30s" }
    );

    res.json({ accesstoken });
  });
};

module.exports = { handleRefreshToken };
