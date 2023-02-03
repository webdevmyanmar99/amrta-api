## digitalocean spaces

npm install --save aws-sdk formidable-serverless // OR
yarn add aws-sdk formidable-serverless

---

import aws from "aws-sdk";const s3 = new aws.S3({
endpoint: "nyc3.digitaloceanspaces.com",
accessKeyId: process.env.SPACES_ACCESS_KEY,
secretAccessKey: process.env.SPACES_SECRET_KEY,
});

---

<input
type="file"
{/_ Specify this if you want user to only upload specific file types _/}
accept={fileTypes}
onChange={async (e) => {
if (e.target.files.length > 0) {
// Update UI to show file is uploading
const file = e.target.files[0];

      // Create FormData and pass picked file with other necessary details
      const formData = new FormData();
      formData.append("file", file);
      formData.append("id", userId);      try {
        const uploadFileRes = await fetch("/api/uploadFile", {
          method: "POST",
          body: formData,
        });        const uploadFileData = await uploadFileRes.json();
        // Retrieve url and show it to user?
        // Update UI to show file has been uploaded
      } catch (e) {
        console.log(e);
        // Update UI to show file upload failed
      }
    }

}}
/>

---

import aws from "aws-sdk";
import formidable from "formidable-serverless";
const s3 = new aws.S3({
endpoint: "nyc3.digitaloceanspaces.com",
accessKeyId: process.env.SPACES_ACCESS_KEY,
secretAccessKey: process.env.SPACES_SECRET_KEY,
});
const form = new formidable.IncomingForm();
form.uploadDir = "./";
form.keepExtensions = true;
form.parse(req, async (err, fields, files) => {
if (err || !fields.id) return res.status(500); // Read file
const file = fs.readFileSync(files.file.path);

s3.upload({
Bucket: "bucket-name", // Add bucket name here
ACL: "public-read", // Specify whether anyone with link can access the file
Key: `${fields.id}/${files.file.name}`, // Specify folder and file name
Body: file,
}, {
partSize: 10 _ 1024 _ 1024,
queueSize: 10,
}).send((err, data) => {
if (err) return res.status(500); // Unlink file
fs.unlinkSync(files.file.path); // Return file url or other necessary details
return res.send({
url: data.Location
});
});
});
# amrtagov4
