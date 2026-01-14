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

module.exports = { imageRouter };
