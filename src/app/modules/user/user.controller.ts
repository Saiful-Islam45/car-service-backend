import { Request, Response } from 'express';
import { RequestHandler } from 'express-serve-static-core';
import httpStatus from 'http-status';
import tryCatch from '../../../shared/tryCatch';
import genericResponse from '../../../shared/genericResponse';
import { UserService } from './user.service';
import { jwtHelpers } from '../../../helpers/jwtHelper';
import config from '../../../config';
import { Secret } from 'jsonwebtoken';

const createUser: RequestHandler = tryCatch(
  async (req: Request, res: Response) => {
    const userData = req.body;
    const result = await UserService.createUser(userData);

    genericResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'user created successfully!',
      data: result,
    });
  }
);

const getAllUsers = tryCatch(async (req: Request, res: Response) => {
  const result = await UserService.getAllUsers();

  genericResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Users retrieved successfully',
    data: result,
  });
});

const getUserbyID = tryCatch(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await UserService.getUserbyID(id);

  genericResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User retrieved successfully',
    data: result,
  });
});

const updateUser = tryCatch(async (req: Request, res: Response) => {
  const { id } = req.params;
  const payload = req.body;
  const result = await UserService.updateUser(id, payload);

  genericResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User updated successfully',
    data: result,
  });
});

const deleteUser = tryCatch(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await UserService.deleteUser(id);

  genericResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User Deleted successfully',
    data: result,
  });
});

const getProfileInfo = tryCatch(async (req: Request, res: Response) => {
  const token = req.headers.authorization;
  const { userId: id } = jwtHelpers.verifyToken(
    token as string,
    config.jwt_secret as Secret
  );
  const result = await UserService.getUserbyID(id);

  genericResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User retrieved successfully',
    data: result,
  });
});
const updateProfileInfo = tryCatch(async (req: Request, res: Response) => {
  const token = req.headers.authorization;
  const payload = req.body;
  
  const { userId: id } = jwtHelpers.verifyToken(
    token as string,
    config.jwt_secret as Secret
  );
  
  const result = await UserService.updateUser(id, payload);

  genericResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User updated successfully',
    data: result,
  });
});

export const UserController = {
  createUser,
  getAllUsers,
  getUserbyID,
  updateUser,
  deleteUser,
  getProfileInfo,
  updateProfileInfo,
};
