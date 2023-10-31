import { Model } from 'mongoose';

export interface ICar {
  _id?: string;
  name: string;
  specifications: {
    gear: 'auto' | 'manual';
    seats: number;
    others: string;
  };
  category: string;
  status: 'rented' | 'available';
  condition: 'new' | 'used';
  location: 'Address-1' | 'Address-2' | 'Address-3' | 'Address-4';
  price: number;
  createdAt?: Date;
  updatedAt?: Date;
}
export type CarModel = Model<ICar>;
