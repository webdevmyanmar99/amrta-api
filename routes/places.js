import express from "express";
import {
  getPlace,
  getAllPlaces,
  updatePlace,
  deletePlace,
  getNearPlaces,
  // getHotel,
  // getAllPlacesByLimit,
  getPlaceByPage,
  getNearPlacesByType,
  updateSingleImage,
  getPlaceBySearch,
} from "../controllers/places.js";

const router = express.Router();

router.get("/:id", getPlace);
router.get("/", getAllPlaces);
router.patch("/:id", updatePlace);
router.delete("/:id", deletePlace);
router.get("/near/:longitude/:latitude", getNearPlaces);
router.get("/nearbytype/:longitude/:latitude/:place", getNearPlacesByType);
// router.get("/find/:place", getHotel);
// get places by limit
// router.get("/getallplacesbylimit/:limit", getAllPlacesByLimit);
router.get("/getplacebypage/:place", getPlaceByPage);

router.get("/getplacebysearch/", getPlaceBySearch);

//singleimage
router.patch("/updateSingleImage/:id", updateSingleImage);

export default router;
