const { userDB } = require("./registerController");

const getUserName = (req, res) => {
  const users = userDB.getName();
  res.status(200).json({ users });
};

const getProfileData = (req, res) => {
  console.log("User data is fetched");
  const user = req.body.username || req.user;

  res.json({ message: `User ${user} fetch his own data` });
};

module.exports = { getUserName, getProfileData };
