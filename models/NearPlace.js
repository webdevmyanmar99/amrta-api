import mongoose from 'mongoose';

const NearPlaceSchema = new mongoose.Schema({
  placeName: String,
  description: String,
  location: {
    type: {
      type: String,
      enum: ['Point'],
      default: 'Point',
    },
    coordinates: {
      type: [Number],
      default: [0, 0],
    },
  },
});

NearPlaceSchema.index({ location: '2dsphere' });

const NearPlace = mongoose.model('NearPlace', NearPlaceSchema);

export default NearPlace;
