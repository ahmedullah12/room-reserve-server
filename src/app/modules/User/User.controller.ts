import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { UserServices } from "./User.service";
import httpStatus from "http-status"


const createUser = catchAsync(async(req, res) => {
    const result = await UserServices.createUserIntoDB(req.body);

    
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "User registered successfully",
        data: result,
    })
});

const loginUser = catchAsync(async(req, res) => {
    const result = await UserServices.loginUser(req.body);
    const {accessToken, user} = result;

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        token: accessToken,
        message: "User logged in successfully",
        data: user
    })
})

export const  UserController = {
    createUser,
    loginUser,
}