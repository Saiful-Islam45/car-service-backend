import { Model } from 'mongoose';

export interface IAdmin {
  _id?: string;
  phoneNumber: string;
  role: 'admin';
  email: string;
  password: string;
  name: string;
  address: string;
}

export type AdminModel = {
  isAdminExist(
    email: string
  ): Promise<Pick<IAdmin, '_id' | 'password' | 'role' | 'email' >>;
  isPasswordMatched(
    givenPassword: string,
    savedPassword: string
  ): Promise<boolean>;
} & Model<IAdmin>;

export type ILoginUser = {
  email: string;
  password: string;
};

export type ILoginUserResponse = {
  accessToken: string;
  refreshToken?: string;
};

export type IRefreshTokenResponse = {
  accessToken: string;
};

