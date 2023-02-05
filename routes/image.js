import express from "express";

import {
  addImage,
  deleteImage,
  getAllImages,
  updateImage,
} from "../controllers/image.js";

const router = express.Router();
router.post("/", addImage);
router.get("/", getAllImages);
router.delete("/:id", deleteImage);
router.patch("/:id", updateImage);

export default router;
