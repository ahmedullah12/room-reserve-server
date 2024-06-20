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

    const isResult = result.length > 0;

    sendResponse(res, {
        statusCode: isResult ? httpStatus.OK : httpStatus.NOT_FOUND,
        success:  isResult ? true : false,
        message:  isResult ? "All bookings retrieved successfully" : "No Data Found", 
        data: result || [],
    })
});



const updateBooking = catchAsync(async(req, res) => {
    const {id} = req.params;
    const result = await BookingServices.updateBookingIntoDB(id, req.body);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Booking updated successfully",
        data: result,
    })
})
const deleteBooking = catchAsync(async(req, res) => {
    const {id} = req.params;
    const result = await BookingServices.deleteBookingFromDB(id);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Booking deleted successfully",
        data: result,
    })
})


export const BookingController = {
    createBooking,
    getAllBooking,
    updateBooking,
    deleteBooking
}