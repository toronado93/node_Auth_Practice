const ROLE_LIST = require("../config/role_list");

// Dynamic functionality allow us to get data from global scop to put in express environment

const verifyRole = (...allowed_role) => {
  return (req, res, next) => {
    if (!req?.roles) return res.sendStatus(401);
    const rolesArray = [...allowed_role];

    // understand to logic
    // imagine this lan as an array req.roles
    //.map((role) => rolesArray.includes(role)) we also attached find array method and work on the method already newly created by map method in order to escape from array bracket and optain plain true or false in order to use it in condition
    const result = req.roles
      .map((role) => rolesArray.includes(role))
      .find((val) => val === true);
    const resultPlain = req.roles.map((role) => rolesArray.includes(role));
    console.log(result, resultPlain);
    if (!result) res.sendStatus(401);
    next();
  };
};

module.exports = verifyRole;
