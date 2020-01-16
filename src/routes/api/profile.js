import { Router } from 'express';
import UsersController from '../../controllers/UsersController';
// import verifyToken from '../../middlewares/verifyToken';
// import validateUser from '../../middlewares/validateUser';
// import checkUpdateUserPermission from '../../middlewares/checkUpdateUserPermission';
// import asyncHandler from '../../middlewares/asyncHandler';
// import AuthLocalController from '../../controllers/AuthLocalController';
// import isActiveUser from '../../middlewares/isActiveUser';
// import verifyAdmin from '../../middlewares/verifyAdmin';
// import checkUpdateUser from '../../middlewares/checkUpdateUser';
// import checkSignUpPermission from '../../middlewares/checkSignUpPermission';

const router = Router();

// router.put(
//   '/',
//   verifyToken,
//   checkUpdateUserPermission,
//   validateUser,
//   checkUpdateUser,
//   UserController.update
// ); // update user profile

router.get(
  '/search',
  // verifyToken,
  // verifyAdmin,
  // checkUpdateUserPermission,
  UsersController.searchEmployee
);
// router.get('/email/confirm/:token', verifyToken, UserController.confirmEmailUpdate); // confirm email update
// router.get('/authors', verifyToken, asyncHandler(UserController.getAllAuthors));
router.put(
  '/:id',
  // verifyToken,
  // validateUser,
  // isActiveUser,
  // checkUpdateUserPermission,
  // checkUpdateUser,
  UsersController.update
);

// router.get('/', verifyToken, verifyAdmin, asyncHandler(UserController.getAll));
// // user followers
// router.get('/followers', verifyToken, UserController.followers);

// // user following
// router.get('/following', verifyToken, UserController.following);
router.delete(
  '/:id',
  // verifyToken,
  // checkUpdateUserPermission,
  // isActiveUser,
  UsersController.deleteEmployeeAccount
);
// router.patch('/:username/unfollow', verifyToken, UserController.unfollow);

// router.get('/:id', verifyToken, verifyAdmin, checkUpdateUserPermission, AuthLocalController.getOne);
router.post(
  '/',
//   verifyToken,
//   verifyAdmin,
//   validateUser,
//   checkSignUpPermission,
  UsersController.create
);
router.put('/:id/activate/',
//  verifyToken,
UsersController.activate);
router.put('/:id/suspend/',
//  verifyToken,
UsersController.suspend);
// router.patch('/:username/follow', verifyToken, isActiveUser, UserController.follow);
export default router;