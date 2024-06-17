import { TRoom } from "./Room.interface";
import { Room } from "./Room.model";

const createRoomIntoDB = async(payload: TRoom) => {
    const result = await Room.create(payload);

    return result;
};

const getAllRoomFromDB = async() => {
    const result = await Room.find();

    return result;
};


const getSingleRoomFromDB = async(id: string) => {
    const result = await Room.findById(id);

    return result;
}

export const RoomServices = {
    createRoomIntoDB,
    getAllRoomFromDB,
    getSingleRoomFromDB
}