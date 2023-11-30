const { format } = require("date-fns");
const { v4: uuid } = require("uuid");
const fsPromises = require("fs").promises;
const fs = require("fs");
const path = require("path");

const logEvents = async (service = "Undefined Service", message) => {
  const datetime = `${format(new Date(), "yyyyMMdd\tHH:mm:ss")}`;
  const logItem = `${datetime}\t${service}\t${uuid()}\t${message}\n`;
  const logFileName = `${format(new Date(), "dd.MM.yyyy")}-eventLog.txt`;

  const fileRoute = path.join(__dirname, "..", "log");

  try {
    if (!fs.existsSync(fileRoute)) {
      await fsPromises.mkdir(fileRoute);
      console.log("Log route is created");
    }

    await fsPromises.appendFile(path.join(fileRoute, logFileName), logItem);
  } catch (error) {
    console.log(error);
  }
};

// logevents is transformed into express.js http object in order to serve as middleware
// In this middleware we use it as request log keeper.
const logger = async (req, res, next) => {
  logEvents("System Login", `${req.method}/${req.url}`);
  next();
};

// module.exports = logger;
module.exports = { logEvents, logger };
