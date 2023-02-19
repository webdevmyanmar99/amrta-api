import express from "express";
import {
  addFavorite,
  deleteFavoriteById,
  getFavoriteByplaceId,
  getFavoriteByuserId,
  getFavorites,
} from "../controllers/favoriteController.js";
// import { increaseFav } from "../middleware/favorite.js";

const router = express.Router();

router.post("/", addFavorite);
router.delete("/:id", deleteFavoriteById);
router.get("/", getFavorites);
router.get("/getfavoritebyplaceid/:placeId", getFavoriteByplaceId);
router.get("/getfavoritebyuserid/:userId", getFavoriteByuserId);

export default router;
