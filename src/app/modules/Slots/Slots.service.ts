import httpStatus from 'http-status';
import AppError from '../../error/AppError';
import { Room } from '../Room/Room.model';
import { TSlotInterval, TSlots } from './Slots.interface';
import { Slot } from './Slots.model';
import QueryBuilder from '../../builder/QueryBuilder';

const createSlotsIntoDB = async (payload: TSlots) => {
  const { room, date, startTime } = payload;

  //checking if room exists
  const isRoomExists = await Room.isRoomExists(String(room));
  if (!isRoomExists) {
    throw new AppError(httpStatus.NOT_FOUND, "Room doesn't exists");
  }
  const isRoomDeleted = await Room.isRoomDeleted(String(room));
  if (!isRoomDeleted) {
    throw new AppError(httpStatus.NOT_FOUND, "Room doesn't exists");
  }

  const validateTimeDifference = await Slot.validateTimeDifference(payload);

  if (!validateTimeDifference) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'Invalid time difference. The difference between startTime and endTime should be a whole number of hours',
    );
  }

  // getting the slots counts
  const slotsCounts = await Slot.slotsCounts(payload);

  // generating the slots intervals
  const slotIntervals: TSlotInterval[] = [];
  let currentTime = startTime;

  for (let i = 0; i < slotsCounts; i++) {
    const [startHour, startMinute] = currentTime.split(':').map(Number);
    const endHour = startHour + 1;
    const endMinute = startMinute;

    const slotStartTime = currentTime;
    const slotEndTime = `${endHour.toString().padStart(2, '0')}:${endMinute.toString().padStart(2, '0')}`;

    slotIntervals.push({ startTime: slotStartTime, endTime: slotEndTime });
    currentTime = slotEndTime;
  }

  //creating slots
  const createSlotsPromises = slotIntervals.map(async (slot) => {
    const newSlot = {
      room,
      date,
      startTime: slot.startTime,
      endTime: slot.endTime,
    };
    return Slot.create(newSlot);
  });

  const createdSlots = await Promise.all(createSlotsPromises);

  const result = createdSlots;
  return result;
};

const getAvailableSlotsFromDB = async (query: Record<string, unknown>) => {
  const searchCriteria: Record<string, unknown> = {};
  //adding if there is date in query
  if (query.date) {
    searchCriteria.date = query.date;
  }

  //adding if there is roomId in query
  if (query.roomId) {
    searchCriteria.room = query.roomId;
  }

  // by default searchCriteria is emply object , so should get all the data
  // const result = await Slot.find(searchCriteria).populate('room');
  const slotQuery = new QueryBuilder(Slot.find(searchCriteria).populate('room'), query).paginate();
  const result = await slotQuery.modelQuery;
  const meta = await slotQuery.countTotal();
  return {
    result, meta
  };
};

const updateSlotIntoDB = async (id: string, payload: Partial<TSlots>) => {
  // Checking if the slot exists
  const isSlotExists = await Slot.isSlotExists(id);

  if (!isSlotExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'Slot not found');
  }

  // If both startTime and endTime are provided in the payload, validate the time difference
  if (payload.startTime && payload.endTime) {
    const [startHour, startMinute] = payload.startTime.split(':').map(Number);
    const [endHour, endMinute] = payload.endTime.split(':').map(Number);

    // Check if the difference is exactly 1 hour and the minutes are the same
    if (endHour - startHour !== 1 || startMinute !== endMinute) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        'Invalid time difference. The difference between startTime and endTime should be exactly one hour.'
      );
    }
  }

  // Proceeding with the update if validation passes
  const result = await Slot.findByIdAndUpdate(id, payload, { new: true });

  return result;
};

const deleteSlotFromDB = async (id: string) => {
  //checking if room exists
  const isSlotExists = await Slot.isSlotExists(id);

  if (!isSlotExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'Slot not found');
  };

  const result = await Slot.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true },
  );

  return result;
};

export const SlotsServices = {
  createSlotsIntoDB,
  getAvailableSlotsFromDB,
  updateSlotIntoDB,
  deleteSlotFromDB,
};
