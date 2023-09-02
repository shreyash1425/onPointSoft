const express = require("express");

const router = express.Router();
const bcrypt = require("bcrypt");

const Client = require("../models/Client");

router.post("/", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ status: "Failed", message: "All Fields required" });
    }

    if (password.length < 8) {
      return res
        .status(400)
        .json({ status: "Failed", message: "Password must be 8 characters" });
    }

    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/;
    if (!password.match(passwordRegex)) {
      return res.status(400).json({
        status: "failed",
        message:
          "Must have satisfy condition one cpaital, small case, special char and number",
      });
    }

    const userExist = await Client.findOne({ email });
    if (userExist) {
      return res
        .status(400)
        .json({ status: "Failed", message: "You have an Account" });
    }

    const saltRounds = 5;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const client = new Client({
      name,
      email,
      password: hashedPassword,
    });

    await client.save();

    return res.status(200).json({ status: "Success", data: client });
  } catch (err) {
    return res
      .status(500)
      .json({ status: "Failed", message: "Internal Server Error", err: err });
  }
});

module.exports = router;
