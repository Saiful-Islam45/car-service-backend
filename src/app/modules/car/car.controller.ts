import { Request, Response } from 'express';
import { RequestHandler } from 'express-serve-static-core';
import httpStatus from 'http-status';
import tryCatch from '../../../shared/tryCatch';
import genericResponse from '../../../shared/genericResponse';
import { CarService } from './car.service';

const createCar: RequestHandler = tryCatch(
  async (req: Request, res: Response) => {
    const carData = req.body;
    const result = await CarService.createCar(carData);

    genericResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'car created successfully!',
      data: result,
    });
  }
);

const getAllCars = tryCatch(async (req: Request, res: Response) => {
  const result = await CarService.getAllCars();

  genericResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Cars retrieved successfully',
    data: result,
  });
});

const getCarbyID = tryCatch(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await CarService.getCarbyID(id);

  genericResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Car retrieved successfully',
    data: result,
  });
});

const updateCar = tryCatch(async (req: Request, res: Response) => {
  const { id } = req.params;
  const payload = req.body;
  const result = await CarService.updateCar(id, payload);

  genericResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Car updated successfully',
    data: result,
  });
});

const deleteCar = tryCatch(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await CarService.deleteCar(id);

  genericResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Car Deleted successfully',
    data: result,
  });
});

export const CarController = {
  createCar,
  getAllCars,
  getCarbyID,
  updateCar,
  deleteCar
};
