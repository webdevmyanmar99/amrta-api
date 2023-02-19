import mongoose, { Schema } from "mongoose";

const FavoriteSchema = new mongoose.Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  place: {
    type: Schema.Types.ObjectId,
    ref: "Place",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Favorite = mongoose.model("Favorite", FavoriteSchema);
export default Favorite;
