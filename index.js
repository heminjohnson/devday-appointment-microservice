const express = require("express");
const routes = require("./routes/routes");

const app = express();
const port = 3000;

app.use(express.json());
app.use(routes);

app.listen(process.env.PORT || port, () => {
  console.log("Server is up on port " + port);
});
