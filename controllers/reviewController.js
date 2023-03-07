import Review from "../models/reviewSchema.js";
import Place from "../models/Place.js";

export const getRating = async (req, res) => {
  try {
    const { placeId } = req.params;
    const reviews = await Review.find({ place: placeId }).populate(
      "user",
      "name"
    );
    let sum = 0;
    reviews.forEach((review) => {
      sum += review.rating;
    });
    const averageRating = sum / reviews.length;

    // detail rating

    const ratingone = await Review.find({ place: placeId, rating: 1 }).count();
    const ratingtwo = await Review.find({ place: placeId, rating: 2 }).count();
    const ratingthree = await Review.find({
      place: placeId,
      rating: 3,
    }).count();
    const ratingfour = await Review.find({ place: placeId, rating: 4 }).count();
    const ratingfive = await Review.find({ place: placeId, rating: 5 }).count();

    const ratingCount =
      ratingone + ratingtwo + ratingthree + ratingfour + ratingfive;

    res.status(200).json({
      averageRating,
      ratingCount,
      ratingone,
      ratingtwo,
      ratingthree,
      ratingfour,
      ratingfive,
      reviews,
    });
  } catch (error) {
    res.status(400).json({
      error: "Could not get rating for this place.",
      message: error.message,
    });
  }
};

export const createReview = async (req, res) => {
  try {
    const { place, user, comment, rating } = req.body;
    const newReview = new Review({ place, user, comment, rating });

    const savedReview = await newReview.save();

    const ratings = await Review.find({ place: place });
    const totalRating = ratings.reduce((sum, rating) => sum + rating.rating, 0);
    const averageRating = totalRating / ratings.length;
    await Place.findByIdAndUpdate(place, {
      rating: averageRating,
    });

    // await Place.findByIdAndUpdate(place, {
    //   $push: { rating: savedReview.rating },
    // });
    res.status(201).json({ savedReview });
  } catch (error) {
    res.status(400).json({
      error: "Could not create reviews",
      message: error.message,
    });
  }
};

export const getReview = async (req, res) => {
  try {
    const { placeId } = req.params;
    const reviews = await Review.find({ place: placeId }).populate(
      "user",
      "name"
    );

    res.status(200).json({ reviews });
  } catch (error) {
    res.status(400).json({
      error: "Could not get review for this place.",
    });
  }
};
