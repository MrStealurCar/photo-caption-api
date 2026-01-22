require("dotenv").config({ path: __dirname + "/../.env" });
const express = require("express");
const session = require("express-session");
const swaggerUI = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");
const app = express();
const port = process.env.PORT || 3000;
const baseUrl = process.env.BASE_URL || `http://localhost:${port}`;
const { usersRouter } = require("./routes/users.js");
const { imageRouter } = require("./routes/images.js");

// Middleware to parse JSON bodies
app.use(express.json());
if (process.env.NODE_ENV === "production") {
  app.set("trust proxy", 1);
}

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
        url: baseUrl,
      },
    ],
  },
  apis: [__dirname + "/routes/*.js"],
};

const swaggerSpecs = swaggerJsdoc(swaggerOptions); // Generates Swagger specs
app.use("/api-docs", swaggerUI.setup(swaggerSpecs)); // Serves Swagger docs

// Session middleware setup
app.use(
  session({
    secret: process.env.SESSION_SECRET || "default_secret",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: process.env.NODE_ENV === "production" },
  }),
);

// Basic route to get rid of 404 on root
app.get("/", (req, res) => {
  res.send("Photo Caption API is running!");
});

// Mounting routers
app.use("/images", imageRouter);
app.use("/users", usersRouter);

// Starts the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

module.exports = app;
