import httpStatus from 'http-status';
import AppError from '../../error/AppError';
import { TRoom } from './Room.interface';
import { Room } from './Room.model';
import QueryBuilder from '../../builder/QueryBuilder';

const searchableFields = ['name', 'roomNo', 'floorNo'];

const createRoomIntoDB = async (payload: TRoom) => {
  const result = await Room.create(payload);

  return result;
};

const getAllRoomFromDB = async (query: Record<string, unknown>) => {
  const roomQuery = new QueryBuilder(Room.find(), query)
    .search(searchableFields)
    .filter()
    .sort();
  const result = await roomQuery.modelQuery;

  return result;
};

const getSingleRoomFromDB = async (id: string) => {
  const result = await Room.findById(id);

  return result;
};

const updateRoomIntoDB = async (id: string, payload: Partial<TRoom>) => {
  //checking if room exists
  const isRoomExists = await Room.isRoomExists(id);
  if (!isRoomExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'Room not found');
  }
  const isRoomDeleted = await Room.isRoomDeleted(id);
  if (!isRoomDeleted) {
    throw new AppError(httpStatus.NOT_FOUND, 'Room not found');
  }

  const result = await Room.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });

  return result;
};

const deleteRoomFromDB = async (id: string) => {
  //checking if room exists
  const isRoomExists = await Room.isRoomExists(id);
  if (!isRoomExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'Room not found');
  }
  const isRoomDeleted = await Room.isRoomDeleted(id);
  if (!isRoomDeleted) {
    throw new AppError(httpStatus.NOT_FOUND, 'Room not found');
  }

  const result = await Room.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true },
  );

  return result;
};

export const RoomServices = {
  createRoomIntoDB,
  getAllRoomFromDB,
  getSingleRoomFromDB,
  updateRoomIntoDB,
  deleteRoomFromDB,
};
