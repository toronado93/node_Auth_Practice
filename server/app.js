const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const testRoute = require("./routes/api/testRoute");
const systemRoute = require("./routes/api/systemRoute");
const registerRoute = require("./routes/api/registerRoute");
const userRoute = require("./routes/api/userRoute");
const authRoute = require("./routes/api/authRoute");
const refreshRoute = require("./routes/api/refreshRoute");
const { logger } = require("./middleware/logEvents");

const verifyJWT = require("./middleware/verifyJWT");

// Middleware
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(logger);

app.use("/testroute", testRoute);
app.use("/systemroute", systemRoute);
app.use("/register", registerRoute);
app.use("/auth", authRoute);
app.use("/refresh", refreshRoute);
app.use(verifyJWT);
app.use("/users", userRoute);

module.exports = app;
