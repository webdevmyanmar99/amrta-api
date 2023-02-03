import express from "express";

import {
  addBooking,
  deleteBooking,
  getAllBookings,
  updateBooking,
} from "../controllers/bookingController.js";

const router = express.Router();
router.post("/", addBooking);
router.get("/", getAllBookings);
router.delete("/:id", deleteBooking);
router.patch("/:id", updateBooking);

export default router;
