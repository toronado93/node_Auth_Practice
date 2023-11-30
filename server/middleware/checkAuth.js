const { userDB } = require("../controllers/registerController");

const checkAuth = (req, res, next) => {
  const person = req.params.name;

  const foundUser = userDB.users.find((user) => user.username === person);

  if (!foundUser || foundUser?.refreshtoken === "") {
    res.status(401).json({ message: "UnAuthorized" });
  } else {
    console.log("User authorizated");
    next();
  }
};

module.exports = checkAuth;
