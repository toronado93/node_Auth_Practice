const fsPromises = require("fs").promises;
const { v4: uuid } = require("uuid");
const path = require("path");
const bcrypt = require("bcrypt");

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
    // If user and password all good , create a refreshtoken and save this refresh token into the db , and return a json include users refreshtoken and login message
    const refreshtoken = uuid();
    // Add refresh Token to logged user
    foundUser.refreshtoken = refreshtoken;

    userDB.setUsers([...otherUsers, foundUser]);

    await fsPromises.writeFile(
      path.join(__dirname, "..", "models", "user.json"),
      JSON.stringify(userDB.users)
    );

    res.status(200).json({ success: "User Logged In!" });
  } else if (foundUser && !isPasswordMatched) {
    res.status(401).json({ message: "UnAuthorized" });

    //  If there is a user compare password , if password is wrong return negative json
  }
};

const handleLogOut = async (req, res) => {
  // Take user info
  const { username, password } = req.body;
  // If there is a match , delete and return , "You are navigated to Login Page"

  const foundUser = userDB.users.find((user) => user.username === username);
  const otherUsers = userDB.users.filter((user) => user.username !== username);

  if (!foundUser) res.status(404).json({ message: "There is no such user" });

  if (foundUser) {
    foundUser.refreshtoken = "";

    userDB.setUsers([...otherUsers, foundUser]);

    await fsPromises.writeFile(
      path.join(__dirname, "..", "models", "user.json"),
      JSON.stringify(userDB.users)
    );
    console.log(userDB.users);

    res.status(200).json({ success: "User Logged Out!" });
  }
};

module.exports = { handleLogin, handleLogOut };
