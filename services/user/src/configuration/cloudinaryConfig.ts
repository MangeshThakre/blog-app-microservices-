import {v2 as cloudinary} from "cloudinary";

// Require the cloudinary library

cloudinary.config({
  cloud_name: process.env.CLOUD_NAMED,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRETE,
  secure: true
});

export default cloudinary;