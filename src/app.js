require("dotenv").config();
const express = require("express");
const session = require("express-session");
const swaggerUI = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");
const app = express();
const port = 3000;
const { usersRouter } = require("./routes/users.js");
const { imageRouter } = require("./routes/images.js");

// Middleware to parse JSON bodies
app.use(express.json());

// Swagger setup
app.use(swaggerUI.serve); // Serves Swagger UI
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Photo Caption API",
      version: "1.0.0",
      description: "API for uploading images and adding captions",
    },
    servers: [
      {
        url: `http://localhost:${port}`,
      },
    ],
  },
  apis: ["./src/routes/*.js"],
};

const swaggerSpecs = swaggerJsdoc(swaggerOptions); // Generates Swagger specs
app.use("/api-docs", swaggerUI.setup(swaggerSpecs)); // Serves Swagger docs

// Session middleware setup
app.use(
  session({
    secret: process.env.SESSION_SECRET || "default_secret",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }, // change to true when deploying with Render
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
