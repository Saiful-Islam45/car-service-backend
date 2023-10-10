import config from '../../../config';
import genericResponse from '../../../shared/genericResponse';
import tryCatch from '../../../shared/tryCatch';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';

const login = tryCatch(async (req: Request, res: Response) => {
  const { ...loginData } = req.body;
  const { refreshToken, ...others } = await AuthService.login(loginData);

  // set refresh token into cookie
  const cookieOptions = {
    secure: config.env === 'production',
    httpOnly: true,
  };

  res.cookie('refreshToken', refreshToken, cookieOptions);

  genericResponse(res, {
    statusCode: 200,
    success: true,
    message: 'User logged in successfully',
    data: others,
  });
});

const refreshToken = tryCatch(async (req: Request, res: Response) => {
  const { refreshToken } = req.cookies;

  const result = await AuthService.refreshToken(refreshToken);

  const cookieOptions = {
    secure: config.env === 'production',
    httpOnly: true,
  };

  res.cookie('refreshToken', refreshToken, cookieOptions);

  genericResponse(res, {
    statusCode: 200,
    success: true,
    message: 'New access token generated successfully !',
    data: result,
  });
});

export const AuthController = {
  login,
  refreshToken,
};
