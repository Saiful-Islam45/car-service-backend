import httpStatus from 'http-status';
import ApiError from '../../errors/ApiError';
import { NextFunction, Response, Request } from 'express';
import { jwtHelpers } from '../../helpers/jwtHelper';
import config from '../../config';
import { Secret } from 'jsonwebtoken';

const auth =
  (...authorizedRoles: string[]) =>
  async (req: Request, _res: Response, next: NextFunction): Promise<void> => {
    try {
      const token = req.headers.authorization;

      if (!token) {
        throw new ApiError(
          httpStatus.UNAUTHORIZED,
          'You are not authorized to access'
        );
      }

      let verifiedUser = null;
      verifiedUser = jwtHelpers.verifyToken(token, config.jwt_secret as Secret);
      req.user = verifiedUser;

      // rule wise validation
      if (
        authorizedRoles.length &&
        !authorizedRoles.includes(verifiedUser.role)
      ) {
        throw new ApiError(httpStatus.FORBIDDEN, 'Forbidden');
      }
      next();
    } catch (error) {
      next(error);
    }
  };

export default auth;
