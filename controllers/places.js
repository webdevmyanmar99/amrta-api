import Place from "../models/Place.js";
import dotenv from "dotenv";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import sharp from "sharp";
import { fileTypeFromBuffer } from "file-type";
dotenv.config();
import { s3Client } from "../s3.js";

// read
export const getPlace = async (req, res) => {
  try {
    const { id } = req.params;
    const place = await Place.findById(id);

    res.status(200).json(place);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getHotel = async (req, res) => {
  try {
    const { place } = req.params;
    const data = await Place.find({ placeType: place });
    res.json(data);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getPlaceByLimit = async (req, res) => {
  try {
    const { place, limit } = req.params;
    const data = await Place.find({ placeType: place }).limit(limit);
    res.json(data);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getAllPlaces = async (req, res) => {
  try {
    const places = await Place.find({});
    res.status(200).json(places);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getAllPlacesByLimit = async (req, res) => {
  try {
    const { limit } = req.params;
    const places = await Place.find({}).limit(limit);
    res.status(200).json(places);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
// find places by near location

export const getNearPlaces = async (req, res) => {
  try {
    const { longitude, latitude } = req.params;

    const places = await Place.find({
      geolocation: {
        $near: {
          $maxDistance: 5000,
          $minDistance: 1000,
          $geometry: {
            type: "Point",
            coordinates: [longitude, latitude],
          },
        },
      },
    });

    res.status(200).json(places);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// get near places by type

export const getNearPlacesByType = async (req, res) => {
  try {
    const { longitude, latitude, place } = req.params;
    console.log(longitude, latitude, place);

    const places = await Place.find({
      geolocation: {
        $near: {
          $maxDistance: 5000,
          $minDistance: 1000,
          $geometry: {
            type: "Point",
            coordinates: [longitude, latitude],
          },
        },
      },

      placeType: place,
    });

    res.status(200).json(places);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const addPlace = async (req, res) => {
  try {
    var {
      _id,
      placeType,
      placeId,
      localize,
      company,
      address,
      catg,
      description,
      hashtag,
      geolocation,
      price,
      favcount,
      rating,
      remark,
      website,
      email,
      fax,
      festival,
      hospital,
      images,
      singleimage,
      contactnum,
      VerifiedData,
    } = req.body;

    if (!images) {
      return (images = []);
    } else {
      await Promise.all(
        images.map(async (image) => {
          let pathimagesBuffer = new Buffer.from(image.pathimages, "base64");

          let sharpImage = await sharp(pathimagesBuffer)
            .resize({
              height: 1920,
              width: 1080,
              fit: "contain",
            })
            .toBuffer();

          let fileType = await fileTypeFromBuffer(sharpImage);

          let mimeType = fileType.mime;
          let extType = fileType.ext;

          let imageName = `${Date.now()}.${extType}`;

          const uploadParams = {
            Bucket: "amrtago",
            Body: sharpImage,
            Key: imageName,
            ContentType: mimeType,
            ContentEncoding: "base64",
            ACL: "public-read",
          };

          const run = async () => {
            try {
              await s3Client.send(new PutObjectCommand(uploadParams));
            } catch (error) {
              console.log("error", error);
            }
          };
          run();
          image.pathimages = `https://amrtago.sgp1.digitaloceanspaces.com/${imageName}`;
        })
      );
    }

    if (!singleimage) {
      return (singleimage = []);
    } else {
      await Promise.all(
        singleimage.map(async (simage) => {
          let singleimageBuffer = new Buffer.from(simage, "base64");

          let ssharpImage = await sharp(singleimageBuffer)
            .resize({
              height: 1920,
              width: 1080,
              fit: "contain",
            })
            .toBuffer();

          let fileType = await fileTypeFromBuffer(ssharpImage);

          let mimeType = fileType.mime;
          let extType = fileType.ext;

          let imageName = `${Date.now()}-single.${extType}`;

          const uploadParams = {
            Bucket: "amrtago",
            Body: ssharpImage,
            Key: imageName,
            ContentType: mimeType,
            ContentEncoding: "base64",
            ACL: "public-read",
          };

          const run = async () => {
            try {
              await s3Client.send(new PutObjectCommand(uploadParams));
            } catch (error) {
              console.log("error", error);
            }
          };
          run();
          singleimage = `https://amrtago.sgp1.digitaloceanspaces.com/${imageName}`;
        })
      );
    }

    var newPlace = new Place({
      _id,
      placeType,
      placeId,
      localize,
      company,
      address,
      catg,
      description,
      hashtag,
      geolocation,
      price,
      favcount,
      rating,
      remark,
      website,
      email,
      fax,
      festival,
      hospital,
      images: images,
      singleimage: singleimage,
      contactnum,
      VerifiedData,
    });
    const savePlace = await newPlace.save();
    res.status(201).json(savePlace);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updatePlace = async (req, res) => {
  try {
    const updatedPlace = await Place.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );
    res.status(200).json(updatedPlace);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const deletePlace = async (req, res) => {
  try {
    const deletedPlace = await Place.findByIdAndDelete(req.params.id);
    res.status(200).json(deletedPlace);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const updateSingleImage = async (req, res) => {
  try {
    let { singleimage } = req.body;

    if (!singleimage) {
      return (singleimage = []);
    } else {
      await Promise.all(
        singleimage.map(async (simage) => {
          let ssingleimageBuffer = new Buffer.from(simage, "base64");

          // let ssharpImage = await sharp(ssingleimageBuffer).resize({
          //   height: 1920,
          //   width: 1080,
          //   fit: "contain",
          // });
          // .toBuffer()

          let fileType = await fileTypeFromBuffer(ssingleimageBuffer);

          let mimeType = fileType.mime;
          let extType = fileType.ext;

          let imageName = `${Date.now()}-single.${extType}`;

          const uploadParams = {
            Bucket: "amrtago",
            Body: ssingleimageBuffer,
            Key: imageName,
            ContentType: mimeType,
            ContentEncoding: "base64",
            ACL: "public-read",
          };

          const run = async () => {
            try {
              await s3Client.send(new PutObjectCommand(uploadParams));
            } catch (error) {
              console.log("error", error);
            }
          };
          run();
          singleimage = `https://amrtago.sgp1.digitaloceanspaces.com/${imageName}`;
          console.log(singleimage);
        })
      );
    }
    req.body.singleimage = singleimage;
    let updatedSingleImage = await Place.findByIdAndUpdate(
      req.params.id,
      req.body,
      // `"singleimage": ["${singleimage}"]`,
      {
        new: true,
      }
    );
    res.status(200).json(updatedSingleImage);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
