import { TSlotInterval, TSlots } from './Slots.interface';
import { Slot } from './Slots.model';

const createSlotsIntoDB = async (payload: TSlots) => {
  const { room, date, startTime } = payload;

  const validateTimeDifference = await Slot.validateTimeDifference(payload);

  if (!validateTimeDifference) {
    throw new Error(
      'Invalid time difference. The difference between startTime and endTime should be a whole number of hours',
    );
  }

  // getting the slots counts
  const slotsCounts = await Slot.slosCounts(payload);

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

export const SlotsServices = {
  createSlotsIntoDB,
};