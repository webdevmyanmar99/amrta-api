import NearPlace from '../models/NearPlace.js';

// read
export const getNearPlaces = async (req, res) => {
  try {
    const { longitude, latitude } = req.params;

    const nearPlaces = await NearPlace.find({
      location: {
        $near: {
          $maxDistance: 5000,
          $minDistance: 0.1,
          $geometry: {
            type: 'Point',
            coordinates: [longitude, latitude],
          },
        },
      },
    });
    res.status(200).json(nearPlaces);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getAllNearPlaces = async (req, res) => {
  try {
    const nearPlaces = await NearPlace.find({});
    res.status(200).json(nearPlaces);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const addNearPlace = async (req, res) => {
  try {
    const { placeName, description, location } = req.body;

    const newNearPlace = new NearPlace({
      placeName,
      description,
      location,
    });
    const saveNearPlace = await newNearPlace.save();
    res.status(201).json(saveNearPlace);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
