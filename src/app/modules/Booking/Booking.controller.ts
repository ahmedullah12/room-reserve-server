import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { BookingServices } from "./Booking.service";


const createBooking = catchAsync(async(req ,res) => {
    const result = await BookingServices.createBookingIntoDB(req.body);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Booking created successfully", 
        data: result,
    })
});

const getAllBooking = catchAsync(async(req ,res) => {
    const result = await BookingServices.getAllBookingsFromDB();

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "All bookings retrieved successfully", 
        data: result,
    })
});



export const BookingController = {
    createBooking,
    getAllBooking
}