import { Request, Response } from 'express';
import tryCatch from "../../../shared/tryCatch";
import genericResponse from '../../../shared/genericResponse';
import httpStatus from 'http-status';
import { AdminService } from './admin.service';
import config from '../../../config';

const createAdmin = tryCatch(
  async (req: Request, res: Response) => {
    const admindata = req.body;
    const result = await AdminService.createAdmin(admindata);

    genericResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Admin created successfully!',
      data: result,
    });
  }
);

const login = tryCatch(async (req: Request, res: Response) => {
  const { ...loginData } = req.body;
  const { refreshToken, ...others } = await AdminService.login(loginData);

  // set refresh token into cookie
  const cookieOptions = {
    secure: config.env === 'production',
    httpOnly: true,
  };

  res.cookie('refreshToken', refreshToken, cookieOptions);

  genericResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Admin logged in successfully !',
    data: others,
  });
});

export const AdminController = {
  createAdmin,
  login
}