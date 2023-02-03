import {
  S3,
  // PutObjectCommand,
  // DeleteObjectCommand,
  // GetObjectCommand,
} from '@aws-sdk/client-s3';
// import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
// test
import dotenv from 'dotenv';

dotenv.config();

const bucketName = 'amrtago';
const region = 'ap-southeast-1';
const accessKeyId = 'DO008Q9B98WMENHWPW2W';
const secretAccessKey = 'SCY2lcUVywuxHHMSRXcujfCucuD/leCXtfKOdwkI7m8';

export const s3Client = new S3({
  forcePathStyle: false,
  endpoint: 'https://sgp1.digitaloceanspaces.com',
  region,
  credentials: {
    accessKeyId,
    secretAccessKey,
  },
});
