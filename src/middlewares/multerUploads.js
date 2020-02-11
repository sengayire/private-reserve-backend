import multer from 'multer';
import cloudinaryStorage from 'multer-storage-cloudinary';
import cloudinary from 'cloudinary';
import 'dotenv/config';

const {
  NODE_ENV,
  CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET,
} = process.env;
const MAX_IMAGE_SIZE = 1 * 1024 * 1024; // Maximum allowed image size: 1MB

cloudinary.config({
  cloud_name: CLOUDINARY_CLOUD_NAME || null,
  api_key: CLOUDINARY_API_KEY || null,
  api_secret: CLOUDINARY_API_SECRET || null,
});

const storage = cloudinaryStorage({
  cloudinary,
  folder: NODE_ENV !== 'test' ? CLOUDINARY_CLOUD_NAME : 'test',
  allowedFormat: ['jpg', 'png', 'jpeg'],
});

const multerUploads = multer({
  storage,
  limits: { fileSize: MAX_IMAGE_SIZE },
});
// console.log('multer', multerUploads);
export default multerUploads;
