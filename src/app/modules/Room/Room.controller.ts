import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { RoomServices } from "./Room.service";

const createRoom = catchAsync(async(req, res) => {
    const result = await RoomServices.createRoomIntoDB(req.body);



    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Room added successfully",
        data: result,
    })
});

export const RoomController = {
    createRoom
}