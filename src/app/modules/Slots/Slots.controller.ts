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

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Available slots retrieved successfully",
        data: result.result,
        meta: result.meta,
    })
});

const updateSlot = catchAsync(async(req, res) => {
    const {id} = req.params;
    const result = await SlotsServices.updateSlotIntoDB(id, req.body);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Available slots retrieved successfully",
        data: result,
    })
});

const deleteSlot = catchAsync(async(req, res) => {
    const {id} = req.params;
    const result = await SlotsServices.deleteSlotFromDB(id as string);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Slot deleted successfully!!",
        data: result,
    })
})


export const SlotsController = {
    createSlots,
    getAvailableSlots,
    updateSlot,
    deleteSlot
}