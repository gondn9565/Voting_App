const express = require("express");
const app = express();
// const dotenv = require("dotenv");
require("dotenv").config();
const PORT = process.env.PORT || 3000;
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.get("/", (req, res) => {
  res.send("Voting App API is running...");
});
app.listen(PORT, () => {
  console.log("listening on port 30000");
});
