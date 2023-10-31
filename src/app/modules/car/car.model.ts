import mongoose, { model } from 'mongoose';
import { CarModel, ICar } from './car.interface';


const carSchema = new mongoose.Schema<ICar>(
  {
    name: { type: String, required: true },
    specifications: {
      gear: { type: String, enum: ['auto', 'manual'], required: true },
      seats:{ type: Number, required: true },
      others: { type: String, required: false }
    },
    category: { type: String, required: true },
    status: { type: String, enum: ['rented' , 'available'], required: true },
    condition: { type: String, enum: ['new', 'used'], required: true },
    location:{ type: String, enum: ['Address-1', 'Address-2' , 'Address-3' , 'Address-4'], required: true },
    price:{ type: Number, required: true },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

carSchema.statics.isCarExist = async function (
  id: string
): Promise<ICar | null> {
  return await Car.findOne({ _id: id });
};
export const Car = model<ICar, CarModel>('Car', carSchema);
