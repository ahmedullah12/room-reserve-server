/* eslint-disable no-unused-vars */
import { Model, Types } from 'mongoose';

export type TSlots = {
  room: Types.ObjectId;
  date: string;
  startTime: string;
  endTime: string;
  isBooked: boolean;
};

export type TSlotInterval = {
    startTime: string;
    endTime: string;
}

export interface SlotsModel extends Model<TSlots>{
    validateTimeDifference(payload: TSlots) : Promise<boolean>;
    slosCounts(payload: TSlots) : Promise<number>;
}
