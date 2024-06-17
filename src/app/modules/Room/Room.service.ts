import { TRoom } from "./Room.interface";
import { Room } from "./Room.model";

const createRoomIntoDB = async(payload: TRoom) => {
    const result = await Room.create(payload);

    return result;
};

export const RoomServices = {
    createRoomIntoDB
}