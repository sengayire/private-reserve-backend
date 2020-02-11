import dotenv from 'dotenv';
import status from '../config/status';
import { Gallery } from '../queries';

dotenv.config();
const { IMAGE_BASE_URL, NODE_ENV } = process.env;

export default class UploadController {
  static async upload(req, res) {
    const image = req.files && req.files[0];
    console.log('image', image);
    return typeof image === 'object' &&
      typeof image !== 'boolean' &&
      NODE_ENV !== 'test'
      ? (await Gallery.save({
          image: `${image.version}/${image.public_id}.${image.format}`,
          userId: 1,
        })) &&
          res.status(status.CREATED).json({
            image: {
              original: `v${image.version}/${image.public_id}.${image.format}`,
              thumbnail: `${IMAGE_BASE_URL}/w_600/v${image.version}/${image.public_id}.${image.format}`,
              square: `${IMAGE_BASE_URL}/w_320,ar_1:1,c_fill,g_auto,e_art:hokusai/v${image.version}/${image.public_id}.${image.format}`,
              circle: `${IMAGE_BASE_URL}/w_200,c_fill,ar_1:1,g_auto,r_max,b_rgb:262c35/v${image.version}/${image.public_id}.${image.format}`,
            },
          })
      : res.status(status.BAD_REQUEST).json({
          errors: {
            image: 'sorry, you did not provide image to be uploaded',
          },
        });
  }
}
