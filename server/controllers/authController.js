require("dotenv").config();
const fsPromises = require("fs").promises;
const { v4: uuid } = require("uuid");
const path = require("path");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { userDB } = require("./registerController");

const handleLogin = async (req, res) => {
  //   console.log(userDB.users);
  // Take user info
  const { username, password } = req.body;

  //   If there is no info return negative json
  if (!username || !password)
    return res
      .status(400)
      .json({ message: "Username and password are required!" });
  //   If there is user take the user and compare with db
  const foundUser = userDB.users.find((user) => user.username === username);
  const otherUsers = userDB.users.filter((user) => user.username !== username);

  if (!foundUser) res.status(404).json({ message: "There is no such user" });

  const isPasswordMatched = bcrypt.compareSync(password, foundUser.password);

  if (foundUser && isPasswordMatched) {
    // After Matched we create jwt access and refresh token

    const roles = Object.values(foundUser.roles);

    const accesstoken = jwt.sign(
      { UserInfo: { username: foundUser.username, roles: roles } },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "30s" }
    );

    const refreshtoken = jwt.sign(
      { username: foundUser.username },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "1d" }
    );

    // Add access and refresh Token to logged user
    const currentUser = { ...foundUser, refreshtoken };
    userDB.setUsers([...otherUsers, currentUser]);

    await fsPromises.writeFile(
      path.join(__dirname, "..", "models", "user.json"),
      JSON.stringify(userDB.users)
    );
    // Refreshtoken goes into cookie object
    // Accesstoken goes to front-end with json

    res.cookie("jwt", refreshtoken, {
      httpOnly: true,
      sameSite: "None",
      secure: true,
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.status(200).json({
      success: "User Logged In!",
      accesstoken: accesstoken,
      username: username,
    });
    console.log("user loged in!");
  } else if (foundUser && !isPasswordMatched) {
    res.status(401).json({ message: "UnAuthorized" });

    //  If there is a user compare password , if password is wrong return negative json
  }
};

const handleLogOut = async (req, res) => {
  // We dont need username and password here . we need to catch user cookies
  const { username, password } = req.body;

  const cookies = req.cookies;
  if (!cookies?.jwt) {
    return res.sendStatus(204);
  }
  const refreshtoken = cookies.jwt;

  // If there is a match , delete and return , "You are navigated to Login Page"
  const foundUser = userDB.users.find(
    (user) => user.refreshtoken === refreshtoken
  );
  const otherUsers = userDB.users.filter(
    (user) => user.refreshtoken !== refreshtoken
  );

  if (!foundUser) {
    res.status(404).json({ message: "There is no such user" });
  }

  if (foundUser) {
    res.clearCookie("jwt", { httpOnly: true });
    foundUser.refreshtoken = "";
    // I wanna also clear to accesstoken for immediate action

    userDB.setUsers([...otherUsers, foundUser]);

    await fsPromises.writeFile(
      path.join(__dirname, "..", "models", "user.json"),
      JSON.stringify(userDB.users)
    );
    console.log(userDB.users);

    res.status(200).json({ success: "User Logged Out!" });
  }
  console.log("User log out");
};

module.exports = { handleLogin, handleLogOut };
