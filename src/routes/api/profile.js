import { Router } from 'express';
import UsersController from '../../controllers/UsersController';
import UploadController from '../../controllers/UploadController';
import multerUploads from '../../middlewares/multerUploads';

const router = Router();

router.get('/', UsersController.getAllProfile);
router.get('/:id', UsersController.getOneProfile);

router.post('/post/about', UsersController.create);

router.post('/post/details', UsersController.createAdDetails);
router.post(
  '/upload',
  multerUploads.array('image', 1),
  UploadController.upload,
);
router.put('/:id/activate/', UsersController.activate);
router.put('/:id/suspend/', UsersController.suspend);
export default router;
