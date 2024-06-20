import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { SlotsServices } from "./Slots.service";


const createSlots = catchAsync(async(req, res) => {
    const result = await SlotsServices.createSlotsIntoDB(req.body);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Slots created successfully",
        data: result,
    })
});

const getAvailableSlots = catchAsync(async(req, res) => {
    const result = await SlotsServices.getAvailableSlotsFromDB(req.query);

    const isResult = result.length > 0;

    sendResponse(res, {
        statusCode: isResult ? httpStatus.OK : httpStatus.NOT_FOUND,
        success: isResult ? true : false,
        message: isResult ? "Available slots retrieved successfully" : "No Data Found",
        data: result || [],
    })
})


export const SlotsController = {
    createSlots,
    getAvailableSlots
}