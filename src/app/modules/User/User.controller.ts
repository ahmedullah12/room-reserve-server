import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { UserServices } from "./User.services";


const getAllUser = catchAsync(async(req, res) => {
    const result = await UserServices.getAllUser();

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Users data retrieved",
        data: result,
    })
});
const getUser = catchAsync(async(req, res) => {
    const {email} = req.query;
    const result = await UserServices.getUserData(email as string);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "User data retrieved",
        data: result,
    })
});
const makeAdmin = catchAsync(async(req, res) => {
    const {id} = req.params;
    const result = await UserServices.makeAdmin(id as string);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Admin created!!!",
        data: result,
    })
});

export const UserController = {
    getAllUser,
    getUser,
    makeAdmin
}