const express = require("express");
const imageRouter = express.Router();
const { Images, Caption } = require("../../models");

// GET images
imageRouter.get("/", async (req, res) => {
  try {
    const images = await Images.findAll({
      include: Caption,
    });
    res.json(images);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch images" });
  }
});

// POST images
imageRouter.post("/", async (req, res) => {
  try {
    const newImage = await Images.create(req.body);
    res.status(201).json(newImage);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create image" });
  }
});

module.exports = { imageRouter };
