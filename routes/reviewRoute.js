import express from "express";
const router = express.Router();
import {
  createReview,
  getRating,
  getReview,
} from "../controllers/reviewController.js";

router.get("/place/:placeId/rating", getRating);
router.post("/createreview/", createReview);
router.get("/getreview/:placeId", getReview);
export default router;
