const bcrypt = require("bcrypt");
const { User } = require("../../models");
const express = require("express");
const usersRouter = express.Router();

// POST endpoint to create a new user
usersRouter.post("/", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const emailToLower = email.toLowerCase();

    // Basic validation checks
    if (!username || !email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }
    // Check if the email is already in use
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: "Email is already in use" });
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = await User.create({
      username,
      email: emailToLower,
      password: hashedPassword,
    });

    res.status(201).json({
      id: newUser.id,
      username: newUser.username,
      email: newUser.email,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create user" });
  }
});

// Sign-in endpoint
usersRouter.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;

    const emailToLower = email.toLowerCase();

    // Basic validation checks
    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    // Find the user by email
    const user = await User.findOne({ where: { email: emailToLower } });
    if (!user) {
      return res.status(400).json({ error: "Invalid email" });
    }

    // Compare the provided password with the stored hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ error: "Invalid password" });
    }

    req.session.userId = user.id;

    res.status(200).json({
      id: user.id,
      username: user.username,
      email: user.email,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to sign in" });
  }
});

usersRouter.post("/signout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Failed to sign out" });
    }
    res.clearCookie("connect.sid"); // Clear the session cookie
    res.status(200).json({ message: "Signed out successfully" });
  });
});

module.exports = { usersRouter };
