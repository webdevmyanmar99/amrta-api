import mongoose, { Schema } from "mongoose";

const PlaceSchema = new mongoose.Schema({
  _id: Schema.Types.ObjectId,
  placeType: String,
  placeId: Number,
  localize: {
    name: [String],

    company: String,
    address: [
      {
        fulladdress: { type: String, trim: true },
        township: { type: String, trim: true },
        stateanddiv: { type: String, trim: true },
      },
    ],
    catg: {
      encatg: [String],
      mmcatg: [String],
      rucatg: [String],
    },
    description: [String],
    hashtag: {
      enhashtag: [String],
      mmhashtag: [String],
      ruhashtag: [String],
    },
  },
  geolocation: {
    type: {
      type: String,
      enum: ["Point"],
      default: "Point",
    },
    coordinates: {
      type: [Number],
    },
  },
  price: [String],
  favcount: {
    type: Number,
    default: 0,
  },
  rating: {
    type: Number,
    default: 0,
  },
  remark: String,
  website: String,
  email: String,
  fax: String,
  festival: [],
  hospital: String,
  images: [
    {
      pathimages: String,
      description: String,
    },
  ],
  singleimage: [String],
  contactnum: [String],
  VerifiedData: String,
});

PlaceSchema.index({ geolocation: "2dsphere" });
PlaceSchema.index({ placeType: "text" });

const Place = mongoose.model("Place", PlaceSchema);

export default Place;
