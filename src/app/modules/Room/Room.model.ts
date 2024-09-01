import { Schema, model } from 'mongoose';
import { RoomModel, TRoom } from './Room.interface';

const roomSchema = new Schema<TRoom>({
  name: { type: String, required: true },
  roomNo: { type: Number, required: true, unique: true },
  floorNo: { type: Number, required: true },
  capacity: { type: Number, required: true },
  pricePerSlot: { type: Number, required: true },
  images: { type: [String], required: true },
  amenities: { type: [String], required: true },
  isDeleted: { type: Boolean, default: false },
});

// roomSchema.pre('find', async function (next) {
//   this.find({ isDeleted: { $ne: true } });

//   next();
// });
// roomSchema.pre('findOne', async function (next) {
//   this.find({ isDeleted: { $ne: true } });

//   next();
// });

// have to add isRoomExists and isRoomDeleted
roomSchema.statics.isRoomExists = async function (id: string) {
  const room = await Room.findById(id);
  return room;
};
roomSchema.statics.isRoomDeleted = async function (id: string) {
  const room = await Room.findById(id);
  return !!room && !room.isDeleted;
};
roomSchema.statics.roomPricePerSlot = async function (id: string) {
  const room = await Room.findById(id);
  if(room){
    return room.pricePerSlot;
  }
};

export const Room = model<TRoom, RoomModel>('Room', roomSchema);
