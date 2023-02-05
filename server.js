import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import placeRoutes from "./routes/places.js";
import nearRoutes from "./routes/nearRoutes.js";
import { addPlace } from "./controllers/places.js";
import { register } from "./controllers/auth.js";

import { verifyToken } from "./middleware/auth.js";
import { checkAdmin } from "./middleware/admin.js";

// room
import roomRoutes from "./routes/room.js";
// booking
import bookingRoutes from "./routes/booking.js";
// image
import imageRoutes from "./routes/image.js";
// configurations

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
const app = express();

app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use("/assets", express.static(path.join(__dirname, "public/assets")));
// test vercel
app.use("/api", express.static(path.join(__dirname, "public/api")));
// file storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/assets");
  },
  filename: function (req, file, cb) {
    const fileName = file.originalname.toLowerCase().split(" ").join("-");
    cb(null, `img-${Date.now()}-${fileName}`);
  },
});

//check file
const checkFileType = function (file, cb) {
  //Allowed file extensions
  const fileTypes = /jpeg|jpg|png|gif|svg/;

  //check extension names
  const extName = fileTypes.test(path.extname(file.originalname).toLowerCase());

  const mimeType = fileTypes.test(file.mimetype);

  if (mimeType && extName) {
    return cb(null, true);
  } else {
    cb("Error: You can Only Upload Images!!");
  }
};

const upload = multer({
  storage,

  fileFilter: (req, file, cb) => {
    checkFileType(file, cb);
  },
});

// routes with files

app.post("/auth/register", upload.single("picturePath"), register);

// ,upload.array('images')
app.post("/place", addPlace);

// routes
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/place", placeRoutes);
app.use("/room", roomRoutes);
app.use("/booking", bookingRoutes);

// for near place test
app.use("/near", nearRoutes);

app.use("/image", imageRoutes);

// show first page
app.get("*", function (_, res) {
  res.sendFile(path.join(__dirname, "/pages/api/index.html"), function (err) {
    res.status(500).send(err);
  });
});

// mongoose setup
const PORT = process.env.PORT || 3020;
mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server is running at PORT: ${PORT}`));
  })
  .catch((error) => console.log(`${error} did not connect.`));

// test text
