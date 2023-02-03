import express from "express";
import { getAvailableRooms } from "../controllers/bookingController.js";

import {
  addRoom,
  deleteRoom,
  getAllRoom,
  updateRoom,
} from "../controllers/roomController.js";

const router = express.Router();
router.post("/", addRoom);
router.get("/", getAllRoom);
router.delete("/:id", deleteRoom);
router.patch("/:id", updateRoom);
router.get("/availiableRooms/:from_date/:to_date", getAvailableRooms);

export default router;
