const express = require("express");
const router = express.Router();
const Canditate = require("../models/canditate");
const { jwtAuthMiddleware, generateToken } = require("./../jwt");

// POST route to add a user
router.post("/signup", async (req, res) => {
  try {
    const data = req.body; // Assuming the request body contains the person data

    // Create a new Person document using the Mongoose model
    const newCanditate = new User(data);

    // Save the new person to the database
    const response = await newCanditate.save();
    console.log("data saved");

    const payload = {
      id: response.id,
      // username: response.username,
    };
    console.log(JSON.stringify(payload));
    const token = generateToken(payload);
    console.log("Token is : ", token);

    res.status(200).json({ response: response, token: token });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Login Route
router.post("/login", async (req, res) => {
  try {
    // Extract username and password from request body
    const { aadharCardNumber, password } = req.body;

    // Find the user by username
    const canditate = await canditate.findOne({
      aadharCardNumber: aadharCardNumber,
    });

    // If user does not exist or password does not match, return error
    if (!Canditate || !(await Canditate.comparePassword(password))) {
      return res.status(401).json({ error: "Invalid username or password" });
    }

    // generate Token
    const payload = {
      id: Canditate.id,
      // username: user.username,
    };
    const token = generateToken(payload);

    // resturn token as response
    res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Profile route
router.get("/profile", async (req, res) => {
  try {
    const canditateData = req.user;
    // console.log("User Data: ", userData);

    const canditateId = canditateData.id;
    const canditate = await Canditate.findById(canditateId);

    res.status(200).json({ user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.put("/profile/password", jwtAuthMiddleware, async (req, res) => {
  try {
    const canditateId = req.canditate.id; // Extract the id from the token
    const { currentPassword, newPassword } = req.body;
    const canditate = await Canditate.findById(userId);
    if (!(await canditate.comparePassword(currentPassword))) {
      return res.status(401).json({ error: "Invalid  password" });
    }
    canditate.password = newPassword;
    console.log("Password updated");
    res.status(200).json({ message: "Password updated successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
