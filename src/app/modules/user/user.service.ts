import httpStatus from 'http-status';
import config from '../../../config/index';
import ApiError from '../../../errors/ApiError';
import { IUser } from './user.interface';
import { generateUserId } from './user.utils';
import { User } from './user.model';
import bcrypt from 'bcrypt'

const createUser = async (user: IUser): Promise<IUser | null> => {
  if (!user.password) {
    user.password = config.default_user_pass as string;
  }

  const id = await generateUserId();
  user.id = id;

  const newUser = await User.create(user);
  if (!newUser) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create User');
  }
  return newUser;
};

const getAllUsers = async (): Promise<IUser[] | []> => {
  const allUsers = await User.find({});
  if (!allUsers) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to fetch all users');
  }
  return allUsers;
};

const getUserbyID = async (id: string): Promise<IUser | null> => {
  const user = await User.findById(id);
  if (!user) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'Failed to fetch user By ID',
      id
    );
  }
  return user;
};

const updateUser = async (
  id: string,
  payload: Partial<IUser>
): Promise<IUser | null> => {
  const user = await User.findById(id);
  if (!user) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'User not found by ID', id);
  }
  const { name, ...userData } = payload;

  const updatedUserData: Partial<IUser> = { ...userData };

  if (name && Object.keys(name).length > 0) {
    Object.keys(name).forEach(key => {
      const nameKey = `name.${key}` as keyof Partial<IUser>;
      (updatedUserData as any)[nameKey] = name[key as keyof typeof name];
    });
  }
  if(updatedUserData.password) {
    updatedUserData.password = await bcrypt.hash(
      updatedUserData.password,
      Number(config.bycrypt_salt_rounds)
    );
  }
  const result = await User.findByIdAndUpdate({_id: id }, updatedUserData, {
    new: true,
  });
  if (!result) {
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Failed to update user');
  }
  return result;
};

const deleteUser = async (id: string): Promise<IUser | null> => {
  const user = await User.findByIdAndDelete(id);
  return user;
};

export const UserService = {
  createUser,
  getAllUsers,
  getUserbyID,
  updateUser,
  deleteUser
};
