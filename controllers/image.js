import Image from "../models/Image.js";
import dotenv from "dotenv";
import { PutObjectCommand } from "@aws-sdk/client-s3";

import { fileTypeFromBuffer } from "file-type";
dotenv.config();
import { s3Client } from "../s3.js";

export const addImage = async (req, res) => {
  try {
    var { image } = req.body;

    if (!image) {
      return (image = "");
    } else {
      let imageBuffer = new Buffer.from(image, "base64");

      let fileType = await fileTypeFromBuffer(imageBuffer);

      let mimeType = fileType.mime;
      let extType = fileType.ext;

      let imageName = `${Date.now()}-single.${extType}`;

      const uploadParams = {
        Bucket: "amrtago",
        Body: imageBuffer,
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
      image = `https://amrtago.sgp1.digitaloceanspaces.com/${imageName}`;
      console.log(image);
    }
    var newImage = new Image({
      image: image,
    });
    const saveImage = await newImage.save();
    res.status(201).json(saveImage);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteImage = async (req, res) => {
  try {
    const deletedImage = await Image.findByIdAndDelete(req.params.id);
    res.status(200).json(deletedImage);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const updateImage = async (req, res) => {
  try {
    let { image } = req.body;

    if (!image) {
      return (image = "");
    } else {
      let imageBuffer = new Buffer.from(image, "base64");

      let fileType = await fileTypeFromBuffer(imageBuffer);

      let mimeType = fileType.mime;
      let extType = fileType.ext;

      let imageName = `${Date.now()}-single.${extType}`;

      const uploadParams = {
        Bucket: "amrtago",
        Body: imageBuffer,
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
      image = `https://amrtago.sgp1.digitaloceanspaces.com/${imageName}`;
      console.log(image);
    }

    req.body.image = image;
    let updatedImage = await Image.findByIdAndUpdate(
      req.params.id,
      req.body,

      {
        new: true,
      }
    );
    res.status(200).json(updatedImage);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getAllImages = async (req, res) => {
  try {
    const images = await Image.find({});
    res.status(200).json(images);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
