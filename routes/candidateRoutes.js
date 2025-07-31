const express = require("express");
const router = express.Router();
const Candidate = require("../models/candidate");
const { jwtAuthMiddleware, generateToken } = require("./../jwt");
// POST route to add a candidate
const checkAdminRole = async (userID) => {
  try {
    const user = await User.findById(userID);
    return user.role === "admin";
  } catch (err) {
    return false;
  }
};
router.post("/signup", async (req, res) => {
  try {
    if (!checkAdminRole(req.user.id)) {
      return res.status(404).json({ message: "user has not admin role" });
    }
    const data = req.body; // Assuming the request body contains the person data

    // Create a new Person document using the Mongoose model
    const newCandidate = new Candidate(data);

    // Save the new person to the database
    const response = await newCandidate.save();
    console.log("data saved");
    res.status(200).json({ response: response });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
// Profile route
router.get("/", async (req, res) => {
  try {
    const CandidateData = req.user;
    // console.log("User Data: ", userData);

    const CandidateId = CandidateData.id;
    const Candidate = await Candidate.findById(userId);

    res.status(200).json({ Candidate });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.put("/profile/password", try {
    if (!checkAdminRole(req.user.id)) {
      return res.status(404).json({ message: "user has not admin role" });
    }
    const data = req.body; // Assuming the request body contains the person data

    // Create a new Person document using the Mongoose model
    const newCandidate = new Candidate(data);

    // Save the new person to the database
    const response = await newCandidate.save();
    console.log("data saved");
    res.status(200).json({ response: response });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
