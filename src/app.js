const express = require("express");
const app = express();
const port = 3000;

const userRouter = require("./routes/users.js");
const captionRouter = require("./routes/captions.js");
const imageRouter = require("./routes/images.js");
// Middleware to parse JSON bodies
app.use(express.json());
app.use("/images", imageRouter);
app.use("/captions", captionRouter);
app.use("/users", userRouter);

// Starts the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

module.exports = app;
