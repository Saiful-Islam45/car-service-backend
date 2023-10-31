import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { ICar } from './car.interface';
import { Car } from './car.model';

const createCar = async (car: ICar): Promise<ICar | null> => {
  const newCar = await Car.create(car);
  if (!newCar) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create Car');
  }
  return newCar;
};

const getAllCars = async (): Promise<ICar[] | []> => {
  const allCars = await Car.find({});
  if (!allCars) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to fetch all cars');
  }
  return allCars;
};

const getCarbyID = async (id: string): Promise<ICar | null> => {
  const car = await Car.findById(id);
  if (!car) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to fetch car By ID', id);
  }
  return car;
};

const updateCar = async (
  id: string,
  payload: Partial<ICar>
): Promise<ICar | null> => {
  const car = await Car.findById(id);
  if (!car) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Car not found by ID', id);
  }

  const result = await Car.findByIdAndUpdate({ _id: id }, payload, {
    new: true,
  });
  if (!result) {
    throw new ApiError(
      httpStatus.INTERNAL_SERVER_ERROR,
      'Failed to update car'
    );
  }
  return result;
};

const deleteCar = async (id: string): Promise<ICar | null> => {
  const car = await Car.findByIdAndDelete(id);
  if (!car) {
    throw new ApiError(
      httpStatus.INTERNAL_SERVER_ERROR,
      'Failed to delete car'
    );
  }
  return car;
};

export const CarService = {
  createCar,
  getAllCars,
  getCarbyID,
  updateCar,
  deleteCar,
};
