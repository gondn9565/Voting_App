require("dotenv").config();
const express = require("express");
const app = express();
// const dotenv = require("dotenv");
const db = require("./db");
require("dotenv").config();
const PORT = process.env.PORT || 3000;
const { jwtAuthMiddleware } = require("./jwt");
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.get("/", (req, res) => {
  res.send("Voting App API is running...");
});
const userRoutes = require("./routes/userRoutes");
const candidateRoutes = require("./routes/candidateRoutes");
app.use("/user", userRoutes);
app.use("/candidate", candidateRoutes);
// const candidateRoutes = require("./routes/candidateRoutes");
// app.use("/candidate", jwtAuthMiddleware, candidateRoutes);
app.listen(PORT, () => {
  console.log("Server is listening on port 3000");
});
