/* eslint-disable no-unused-vars */
import { Model } from 'mongoose';

export type TRoom = {
  name: string;
  roomNumber: number;
  floorNo: number;
  capacity: number;
  pricePerSlot: number;
  images: string[];
  amenities: string[];
  isDeleted: boolean;
};

export interface RoomModel extends Model<TRoom> {
  isRoomExists(id: string): Promise<TRoom | null>;
  isRoomDeleted(id: string): Promise<boolean>;
  roomPricePerSlot(id: string): Promise<number>;
}
