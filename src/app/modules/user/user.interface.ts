import { Model } from 'mongoose';

export interface IUser {
  _id?: string;
  id: string;
  phoneNumber: string;
  role: 'seller' | 'buyer';
  password: string;
  name: {
    firstName: string;
    lastName: string;
  };
  address: string;
  budget: number;
  income: number;
  createdAt?: Date;
  updatedAt?: Date;
}
export type UserModel = {
  isUserExist(
    phoneNumber: string
  ): Promise<Pick<IUser, '_id' | 'password' | 'role' >>;
  isPasswordMatched(
    givenPassword: string,
    savedPassword: string
  ): Promise<boolean>;
} & Model<IUser>;
