// Import All the Required Modules
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const logger = require("morgan");

// Define
const app = express();

// Cors
app.use(cors());

// Parsing Input
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

// Logging Activities
app.use(logger("dev"));

// Port
const port = process.env.PORT || 3000;

// Server
app.listen(port, () => {
  console.log(`Server listening on: ${port}!`);
});

// Import All Routes
const routerNav = require("./src/index");
app.use("/", routerNav);

// All Other Routes
app.get("*", (req, res) => {
  res.status(404).send("Page not Found.");
});
