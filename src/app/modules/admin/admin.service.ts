import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { IAdmin, ILoginUser, ILoginUserResponse } from './admin.interface';
import config from '../../../config';
import { Admin } from './admin.model';
import { Secret } from 'jsonwebtoken'
import { jwtHelpers } from '../../../helpers/jwtHelper';

const createAdmin = async (admin: IAdmin): Promise<IAdmin | null> => {
  const isAdminExist = await Admin.isAdminExist(admin.email);
  if (isAdminExist) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already exist');
  }
  if (!admin.password) {
    admin.password = config.default_admin_pass as string;
  }
  admin.role = 'admin';
  const newAdmin = await Admin.create(admin);
  if (!newAdmin) {
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Failed to create User');
  }
  return newAdmin;
};


const login = async (payload: ILoginUser): Promise<ILoginUserResponse> => {
  const { email, password } = payload;
  const isAdminExist = await Admin.isAdminExist(email);
  if (!isAdminExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Admin does not exist');
  }

  if (
    isAdminExist.password &&
    !(await Admin.isPasswordMatched(password, isAdminExist.password))
  ) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Password is incorrect');
  }

  //create access token & refresh token

  const { _id: userId, role } = isAdminExist;
  const accessToken = jwtHelpers.createToken(
    { userId, role, email },
    config.jwt_secret as Secret,
    config.jwt_expires_in as string
  );

  const refreshToken = jwtHelpers.createToken(
    { userId, role, email },
    config.jwt_refresh_secret as Secret,
    config.jwt_refresh_expires_in as string
  );

  return {
    accessToken,
    refreshToken,
  };
};

export const AdminService = {
  createAdmin,
  login,
};
