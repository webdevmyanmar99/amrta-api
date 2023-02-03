import mongoose, { Schema } from "mongoose";

const BookSchema = new mongoose.Schema({
  room: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Room",
  },
  start: Date,
  end: Date,
});

const Booking = mongoose.model("Booking", BookSchema);
export default Booking;
