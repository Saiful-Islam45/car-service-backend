import { Model } from 'mongoose';

export interface IAdmin {
  _id?: string;
  phoneNumber: string;
  role: 'admin';
  password: string;
  name: {
    firstName: string;
    lastName: string;
  };
  address: string;
}

export type AdminModel = {
  isAdminExist(
    phoneNumber: string
  ): Promise<Pick<IAdmin, '_id' | 'password' | 'role' >>;
  isPasswordMatched(
    givenPassword: string,
    savedPassword: string
  ): Promise<boolean>;
} & Model<IAdmin>;

// export type AdminModel = Model<IAdmin, Record<string, unknown>>;


export type ILoginUser = {
  phoneNumber: string;
  password: string;
};

export type ILoginUserResponse = {
  accessToken: string;
  refreshToken?: string;
};

export type IRefreshTokenResponse = {
  accessToken: string;
};

