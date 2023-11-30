const os = require("os");
const path = require("path");
const fsPromises = require("fs").promises;
const EventEmitter = require("events");
const { logEvents } = require("../middleware/logEvents");

// Emitter
class Emitter extends EventEmitter {}
const emitter = new Emitter();
// We establish emitter with the function we want to use
emitter.on("log", (service, msg) => {
  logEvents(service, msg);
});

const getMethod = (req, res) => {
  res.json({ message: "SystemRoute", method: "GET" });
};

const postMethod = (req, res) => {
  console.log(req.body);
  const { username, password } = req.body;
  res.json({
    message: "SystemRoute",
    method: "POST",
    user: username,
    password: password,
  });
};

const getOS = (req, res) => {
  console.log(req);
  if (os.type()) {
    // Triger emit for specific reason
    emitter.emit("log", "OS Service", `This url:${req.url} request Os service`);
    res.json({
      code: 200,
      osType: os.type(),
      version: os.version(),
    });
  } else {
    res.json({ code: 204, message: "No OS detected" });
    throw new Error("Couldnt find any OS");
  }
};

// this method takes two parameter , first one , source text , second one target , if there is no such source file return error , otherwise procee to copy and create new file
// after new one created, user is navigated second url for asking to delete original file , if user say yes delete the original file otherwise do not anything and terminate to proccess
const copyfile = async (req, res) => {
  if (!req.query.param2) {
    res.json({ code: 400, message: "There is no file selected" });
  }

  console.log("Test");

  const srcfile = req.query.param1;
  const targetfile = req.query.param2;

  const sourcePath = path.join(__dirname, "..", "/files", srcfile);
  const targetPath = path.join(__dirname, "..", "/files", targetfile);

  try {
    const data = await fsPromises.readFile(sourcePath, "utf8");
    console.log(data);
    await fsPromises.appendFile(targetPath, data);
    const transferreddata = await fsPromises.readFile(targetPath, "utf8");
    res.json({
      code: 200,
      message: "File tranfer is succesfully completed",
      response: transferreddata,
    });
  } catch (error) {
    console.log("There is an error occured");
    res.json({ code: 503, message: "Service is unavailable" });
  }
};

module.exports = { getMethod, postMethod, getOS, copyfile };
