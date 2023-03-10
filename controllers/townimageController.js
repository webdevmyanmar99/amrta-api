import Townimage from "../models/Townimage.js";
import dotenv from "dotenv";
import { PutObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";
import sharp from "sharp";
import { fileTypeFromBuffer } from "file-type";
dotenv.config();
import { s3Client } from "../s3.js";

export const addImage = async (req, res) => {
  try {
    var { image, name, count } = req.body;

    if (!image) {
      return (image = "");
    } else {
      let imageBuffer = new Buffer.from(image, "base64");

      let fileType = await fileTypeFromBuffer(imageBuffer);

      let mimeType = fileType.mime;
      console.log(mimeType);
      let extType = fileType.ext;

      let imageName = `${Date.now()}-town.${extType}`;

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
          await s3Client.send(new PutObjectCommand(uploadParams)).promise();
        } catch (error) {
          console.log("error", error);
        }
      };
      run();
      image = `https://amrtago.sgp1.digitaloceanspaces.com/${imageName}`;
    }

    var newImage = new Townimage({
      image: image,
      name,
      count,
    });
    const saveImage = await newImage.save();
    res.status(201).json(saveImage);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to upload your image.", data: saveImage });
  }
};

export const deleteImage = async (req, res) => {
  const { id } = req.params;
  try {
    let imageString = await Townimage.findById(id, "image -_id");
    var imageName = imageString.image.replace(
      "https://amrtago.sgp1.digitaloceanspaces.com/",
      ""
    );
    console.log(imageName);
    const params = {
      Bucket: "amrtago",
      Key: imageName,
    };

    const run = async () => {
      await s3Client.send(new DeleteObjectCommand(params));
    };
    run();

    const deletedImage = await Townimage.findByIdAndDelete(id);
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

      let imageName = `${Date.now()}-town.${extType}`;

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
          await s3Client.send(new PutObjectCommand(uploadParams)).promise();
        } catch (error) {
          console.log("error", error);
        }
      };
      run();
      image = `https://amrtago.sgp1.digitaloceanspaces.com/${imageName}`;
      console.log(image);
    }

    req.body.image = image;
    let updatedImage = await Townimage.findByIdAndUpdate(
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
    const images = await Townimage.find({});
    res.status(200).json(images);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getImage = async (req, res) => {
  const { id } = req.params;
  try {
    var image = await Townimage.findById(id, "image -_id");

    res.status(200).json(image);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
