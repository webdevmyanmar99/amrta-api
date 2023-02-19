import express from "express";

import {
  addImage,
  deleteImage,
  getAllImages,
  updateImage,
  getImage,
} from "../controllers/image.js";

const router = express.Router();
router.post("/", addImage);
router.get("/", getAllImages);
router.get("/:id", getImage);
router.delete("/:id", deleteImage);
router.patch("/:id", updateImage);

export default router;
