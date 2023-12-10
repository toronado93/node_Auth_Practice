const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const testRoute = require("./routes/api/testRoute");
const systemRoute = require("./routes/api/systemRoute");
const registerRoute = require("./routes/api/registerRoute");
const userRoute = require("./routes/api/userRoute");
const authRoute = require("./routes/api/authRoute");
const refreshRoute = require("./routes/api/refreshRoute");
const { logger } = require("./middleware/logEvents");

const verifyJWT = require("./middleware/verifyJWT");
const verifyRole = require("./middleware/verifyRole");

// Middleware
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(logger);

app.use("/testroute", testRoute);
app.use("/systemroute", systemRoute);
app.use("/register", registerRoute);
app.use("/auth", authRoute);
app.use("/refresh", refreshRoute);
app.use(verifyJWT, verifyRole(2001));
app.use("/users", userRoute);

module.exports = app;
