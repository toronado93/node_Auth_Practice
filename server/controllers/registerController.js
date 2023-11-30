const bcrypt = require("bcrypt");
const fsPromises = require("fs").promises;
const path = require("path");

const userDB = {
  users: require("../models/user.json"),
  setUsers: function (data) {
    this.users = data;
  },
  getName: function () {
    const usernamearray = [];
    const userarray = this.users;

    if (!userarray.length) {
      console.log("There is no user");
    }
    for (let user of userarray) {
      usernamearray.push(user.username);
    }
    return usernamearray;
  },
};

const handleNewUser = async (req, res) => {
  const { username: user, password: pwd } = req.body;
  if (!user || !pwd)
    return res
      .status(400)
      .json({ message: "Username and password are required" });

  //   Check the conflict
  const duplicate = userDB.users.find((person) => person.username === user);
  if (duplicate) return res.sendStatus(409);

  try {
    // encrypt pwd
    const hashedpwd = await bcrypt.hash(pwd, 10);
    // store the new user
    const newuser = {
      username: user,
      password: hashedpwd,
      roles: { User: 2001 },
    };

    userDB.setUsers([...userDB.users, newuser]);

    await fsPromises.writeFile(
      path.join(__dirname, "..", "models", "user.json"),
      JSON.stringify(userDB.users)
    );
    console.log(userDB.users);

    res.status(201).json({ success: `New user ${user} created!` });
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(error);
  }
};

module.exports = { handleNewUser, userDB };
