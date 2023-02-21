import mongoose from "mongoose";

const townimageSchema = new mongoose.Schema({
  image: {
    type: String,
    required: true,
  },
  name: String,
  count: Number,
});

const Townimage = mongoose.model("Townimage", townimageSchema);
export default Townimage;
