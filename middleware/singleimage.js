import dotenv from "dotenv";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import sharp from "sharp";
import { fileTypeFromBuffer } from "file-type";
dotenv.config();
import { s3Client } from "../s3.js";

export const convertSingleImage = async (req, res, next) => {
  try {
    const { singleimage } = req.body;
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

    next();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
