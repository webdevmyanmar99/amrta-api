import express from "express";
import {
  getPlace,
  getAllPlaces,
  updatePlace,
  deletePlace,
  getNearPlaces,
  getHotel,
  getAllPlacesByLimit,
  getPlaceByPage,
  getNearPlacesByType,
  // updateSingleImage,
  getPlaceByTown,
  getPlaceByTownByplaceType,
  addImageByOwner,
  deleteImageByOwner,
  updateImageByOwner,
  //getAllPlacesByPage,
} from "../controllers/places.js";

const router = express.Router();

router.get("/:id", getPlace);
router.get("/", getAllPlaces);
// router.get("/getallplacebypage", getAllPlacesByPage);
router.patch("/:id", updatePlace);
router.delete("/:id", deletePlace);
router.get("/near/:longitude/:latitude", getNearPlaces);
router.get("/nearbytype/:longitude/:latitude/:place", getNearPlacesByType);
router.get("/find/:place", getHotel);
// get places by limit
router.get("/getallplacesbylimit/:limit", getAllPlacesByLimit);
router.get("/getplacebypage/:place", getPlaceByPage);

router.get("/getplacebytown/:town", getPlaceByTown);
router.get(
  "/getplacebytownbyplacetype/:town/:placetype",
  getPlaceByTownByplaceType
);

//singleimage
// router.patch("/updateSingleImage/:id", updateSingleImage);
router.post("/addimagebyowner/:placeId", addImageByOwner);
router.delete("/deleteimagebyowner/:placeId/:imageId", deleteImageByOwner);
router.patch("/updateimagebyowner/:placeId/:imageId", updateImageByOwner);

export default router;
