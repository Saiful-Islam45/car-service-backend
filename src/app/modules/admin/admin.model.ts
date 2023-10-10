import mongoose, { model } from 'mongoose';
import { AdminModel, IAdmin } from './admin.interface';
import config from '../../../config';
import bcrypt from 'bcrypt';

const adminSchema = new mongoose.Schema<IAdmin, AdminModel>(
  {
    phoneNumber: { type: String, required: true, unique: true },
    role: { type: String, enum: ['admin'], required: true },
    password: { type: String, required: true, select: 0 },
    name: {
      type: {
        firstName: {
          type: String,
          required: true,
        },
        lastName: {
          type: String,
          required: true,
        },
      },
      required: true,
    },
    address: { type: String, required: true },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

adminSchema.statics.isAdminExist = async function (
  phoneNumber: string
): Promise<Pick<IAdmin, '_id' | 'password' | 'role'> | null> {
  return await Admin.findOne({ phoneNumber }, { _id: 1, password: 1, role: 1 });
};

adminSchema.statics.isPasswordMatched = async function (
  givenPassword: string,
  savedPassword: string
): Promise<boolean> {
  return await bcrypt.compare(givenPassword, savedPassword);
};

adminSchema.pre('save', async function (next) {
  // hashing password
  this.password = await bcrypt.hash(
    this.password,
    Number(config.bycrypt_salt_rounds)
  );

  next();
});

export const Admin = model<IAdmin, AdminModel>('Admin', adminSchema);
