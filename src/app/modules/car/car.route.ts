import express from 'express';
import validateRequest from '../../middlewares/validationRequest';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import { CarValidation } from './car.validation';
import { CarController } from './car.controller';
const router = express.Router();

router.post(
  '/create-car',
  validateRequest(CarValidation.createCarZodSchema),
  auth(ENUM_USER_ROLE.ADMIN as string),
  CarController.createCar
);
router.patch(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN),
  validateRequest(CarValidation.updateCarZodSchema),
  CarController.updateCar
);
router.get('/:id', auth(ENUM_USER_ROLE.CUSTOMER), CarController.getCarbyID);
router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN as string),
  CarController.deleteCar
);

router.get('/', auth(ENUM_USER_ROLE.ADMIN as string), CarController.getAllCars);
export const CarRoutes = router;
