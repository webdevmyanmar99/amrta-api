import mongoose, { Schema } from "mongoose";
// it work
const RoomSchema = new mongoose.Schema({
  roomId: String,
  hotel: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Amrtago",
  },
  price: Number,
  capacity: Number,
  facilities: [String],
  booked_date: [Date],
});

const Room = mongoose.model("Room", RoomSchema);
export default Room;
