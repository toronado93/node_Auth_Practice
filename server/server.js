const port = 8080;
const app = require("../server/app.js");

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
