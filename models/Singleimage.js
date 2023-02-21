import mongoose from "mongoose";

const singleimageSchema = new mongoose.Schema({
  image: {
    type: String,
    required: true,
  },
});

const Singleimage = mongoose.model("Singleimage", singleimageSchema);
export default Singleimage;
