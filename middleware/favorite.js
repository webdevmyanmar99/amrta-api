import Favorite from "../models/favorite.js";
import Place from "../models/Place.js";

export const increaseFav = async (req, res, next) => {
  try {
    Favorite.pre("save", async function () {
      const Favorite = this;
      const place = await Place.findOne({ _id: Favorite.place });
      place.favcount += 1;
      await place.save();
      next();
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
