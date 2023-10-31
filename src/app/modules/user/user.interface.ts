import { Model, Types } from 'mongoose';

export interface IUser {
  _id?: string;
  id: string;
  phoneNumber: string;
  role: 'customer';
  password: string;
  name: string;
  address: string;
  payment?: Types.ObjectId ;
  createdAt?: Date;
  updatedAt?: Date;
}
export type UserModel = {
  isUserExist(
    email: string
  ): Promise<Pick<IUser, '_id' | 'password' | 'role' >>;
  isPasswordMatched(
    givenPassword: string,
    savedPassword: string
  ): Promise<boolean>;
} & Model<IUser>;
