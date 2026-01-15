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

// GET image by ID
imageRouter.get("/:id", async (req, res) => {
  try {
    const image = await Images.findByPk(req.params.id, {
      include: Caption,
    });
    if (image) {
      res.json(image);
    } else {
      res.status(404).json({ error: "Image not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch image" });
  }
});

// PUT endpoint to add a caption to an image
imageRouter.put("/:id/caption", async (req, res) => {
  try {
    const image = await Images.findByPk(req.params.id);
    if (!image) {
      return res.status(404).json({ error: "Image not found" });
    }

    const newCaption = await Caption.create({
      text: req.body.text,
      imageId: image.id,
    });

    res.status(201).json(newCaption);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to add caption" });
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

// POST to add caption to an image
imageRouter.post("/:imageId/caption", async (req, res) => {
  try {
    const { text } = req.body;
    const { imageId } = req.params;

    // Check if the image exists
    const image = await Images.findByPk(imageId);
    if (!image) {
      return res.status(404).json({ error: "Image not found" });
    }
    // Check if the image already has a caption
    const existingCaption = await image.getCaption();
    if (existingCaption) {
      return res
        .status(400)
        .json({ error: "This image already has a caption" });
    }

    // Create a new caption
    const newCaption = await Caption.create({ text, imageId });
    res.status(201).json(newCaption);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = { imageRouter };
