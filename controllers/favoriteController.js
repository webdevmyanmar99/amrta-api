import Favorite from "../models/favorite.js";
// import Place from "../models/Place.js";

// Create a new favorite
export const addFavorite = async (req, res) => {
  try {
    const { user, place } = req.body;
    const newFavorite = new Favorite({ user, place });
    const savedFavorite = await newFavorite.save();

    // const placefav = await Place.findByIdAndUpdate(place);
    // placefav.favcount += 1;
    // await placefav.save();

    res.status(201).json({ savedFavorite });
  } catch (error) {
    res.status(500).json({
      error: "Could not add favorite",
      message: error.message,
    });
  }
};

// Get all favorites
export const getFavorites = async (req, res) => {
  try {
    const favorites = await Favorite.find().populate("user").populate("place");

    const count = await Favorite.find().count();

    res.status(200).json({ count: count, favorites });
  } catch (error) {
    res.status(500).json({
      error: "Could not get favorites",
      message: error.message,
    });
  }
};

// get favorite by placeId
export const getFavoriteByplaceId = async (req, res) => {
  try {
    const { placeId } = req.params;
    const favorites = await Favorite.find({ place: placeId });
    const count = await Favorite.find({ place: placeId }).count();
    res.status(200).json({
      favorites,
      count: count,
    });
  } catch (error) {
    res.status(500).json({
      error: "Could not get favorites",
      message: error.message,
    });
  }
};

// get favorite by userId
export const getFavoriteByuserId = async (req, res) => {
  try {
    const { userId } = req.params;
    const favorites = await Favorite.find({ user: userId });
    const count = await Favorite.find({ user: userId }).count();
    res.status(200).json({
      favorites,
      count: count,
    });
  } catch (error) {
    res.status(500).json({
      error: "Could not get favorites",
      message: error.message,
    });
  }
};

// Delete favorite by favoriteId
export const deleteFavoriteById = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteFavorite = await Favorite.findByIdAndDelete(id);
    res.status(200).json(deleteFavorite);
  } catch (error) {
    res.status(404).json({
      error: "Could not delete favorite",
      message: error.message,
    });
  }
};
