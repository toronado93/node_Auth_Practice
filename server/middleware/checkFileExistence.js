const fsPromises = require("fs").promises;
const path = require("path");

const checkExistence = async (req, res, next) => {
  if (!req.query.param1) {
    res.json({ code: 400, message: "There is no file selected" });
  }

  const filename = req.query.param1;
  const filePath = path.join(__dirname, "..", "/files");

  try {
    await fsPromises.access(
      path.join(filePath, filename),
      fsPromises.constants.F_OK
    );
    console.log("File Exist");
    next();
  } catch (error) {
    res.json({
      code: 204,
      message: "There is no such a file",
      searchedFileName: filename,
    });
  }
};

module.exports = checkExistence;
