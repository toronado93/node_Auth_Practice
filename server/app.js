const express = require("express");
const app = express();
const testRoute = require("./routes/api/testRoute");
const systemRoute = require("./routes/api/systemRoute");
const registerRoute = require("./routes/api/registerRoute");
const userRoute = require("./routes/api/userRoute");
const authRoute = require("./routes/api/authRoute");
const { logger } = require("./middleware/logEvents");

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(logger);

app.use("/testroute", testRoute);
app.use("/systemroute", systemRoute);
app.use("/users", userRoute);
app.use("/register", registerRoute);
app.use("/auth", authRoute);

module.exports = app;
