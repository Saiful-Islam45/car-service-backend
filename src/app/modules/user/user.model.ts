import mongoose, { Types, model } from 'mongoose';
import { IUser, UserModel } from './user.interface';
import config from '../../../config';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema<IUser, UserModel>(
  {
    id: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    role: { type: String, enum: ['customer'], required: true },
    password: { type: String, required: true, select: 0 },
    name: {
      type: String,
      required: true,
    },
    address: { type: String, required: true },
    payment: {
      type: Types.ObjectId,
      ref: 'Payment',
      required: false,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

userSchema.statics.isUserExist = async function (
  email: string
): Promise<Pick<IUser, '_id' | 'password' | 'role'> | null> {
  return await User.findOne({ email }, { _id: 1, password: 1, role: 1 });
};

userSchema.statics.isPasswordMatched = async function (
  givenPassword: string,
  savedPassword: string
): Promise<boolean> {
  return await bcrypt.compare(givenPassword, savedPassword);
};

userSchema.pre('save', async function (next) {
  this.password = await bcrypt.hash(
    this.password,
    Number(config.bycrypt_salt_rounds)
  );

  next();
});
export const User = model<IUser, UserModel>('User', userSchema);
