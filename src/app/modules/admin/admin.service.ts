import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { IAdmin, ILoginUser, ILoginUserResponse } from './admin.interface';
import config from '../../../config';
import { Admin } from './admin.model';
import jwt, { Secret } from 'jsonwebtoken'
import { jwtHelpers } from '../../../helpers/jwtHelper';

const createAdmin = async (admin: IAdmin): Promise<IAdmin | null> => {
  if (!admin.password) {
    admin.password = config.default_admin_pass as string;
  }
  admin.role = 'admin';
  const newAdmin = await Admin.create(admin);
  if (!newAdmin) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create User');
  }
  return newAdmin;
  // const session = await mongoose.startSession();
  // try {
  //   session.startTransaction();

  //   const newAdmin = await Admin.create([admin], { session });

  //   if (!newAdmin.length) {
  //     throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create Admin ');
  //   }
  //   const user = {
  //     ...admin,
  //     role: newAdmin[0]._id,
  //     budget: 0,
  //     income: 0,
  //   };

  //   const newUser = await User.create([user], { session });

  //   if (!newUser.length) {
  //     throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create admin');
  //   }
  //   await session.commitTransaction();
  //   await session.endSession();
  //   return newAdmin[0];
  // } catch (error) {
  //   await session.abortTransaction();
  //   await session.endSession();
  //   throw error;
  // }
};


const login = async (payload: ILoginUser): Promise<ILoginUserResponse> => {
  const { phoneNumber, password } = payload;
  const isAdminExist = await Admin.isAdminExist(phoneNumber);
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
    { userId, role },
    config.jwt_secret as Secret,
    config.jwt_expires_in as string
  );

  const refreshToken = jwtHelpers.createToken(
    { userId, role },
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
