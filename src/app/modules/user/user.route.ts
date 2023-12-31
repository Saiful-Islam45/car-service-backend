import express from 'express';
import validateRequest from '../../middlewares/validationRequest';
import { UserController } from './user.controller';
import { UserValidation } from './user.validation';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
const router = express.Router();
const authRouter = express.Router();

authRouter.post(
  '/signup',
  validateRequest(UserValidation.createUserZodSchema),
  UserController.createUser
);
router.patch(
  '/:id',
  auth(ENUM_USER_ROLE.CUSTOMER as string),
  validateRequest(UserValidation.updateUserZodSchema),
  UserController.updateUser
);
router
  .route('/update-profile')
  .patch(
    auth(ENUM_USER_ROLE.CUSTOMER),
    UserController.updateProfileInfo
  );
router.get(
  '/:id',
  auth(ENUM_USER_ROLE.CUSTOMER),
  UserController.getUserbyID
);
router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN as string),
  UserController.deleteUser
);

router.get(
  '/',
  auth(ENUM_USER_ROLE.ADMIN as string),
  UserController.getAllUsers
);
export const UserRoutes = {
  router,
  authRouter,
};
