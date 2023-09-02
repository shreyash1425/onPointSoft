const express = require("express");
const Client = require("../models/Client");
const router = express.Router();

router.post("/", async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res
        .status(400)
        .json({ status: "Failed", message: "Give all fields" });
    }
    const client = await Client.findOne({ email });

    if (!client || !(await client.comparePassword(password))) {
      return res
        .status(401)
        .json({ status: "Failed", message: "Wrong gmail or password" });
    }

    client.lastLogin = new Date();
    await client.save();

    res
      .status(200)
      .json({ status: "Success", message: "Login Successfull" });
  } catch (err) {
    res
      .status(500)
      .json({ status: "Failed", message: "Internal server error" });
  }
});

module.exports = router;


