require("dotenv").config();
const express = require("express");
const session = require("express-session");
const app = express();
const port = 3000;
const { usersRouter } = require("./routes/users.js");
const { imageRouter } = require("./routes/images.js");

// Middleware to parse JSON bodies
app.use(express.json());

// Session middleware setup
app.use(
  session({
    secret: process.env.SESSION_SECRET || "default_secret",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

// Mounting routers
app.use("/images", imageRouter);
app.use("/users", usersRouter);

// Starts the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

module.exports = app;
