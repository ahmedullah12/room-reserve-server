import catchAsync from "../../utils/catchAsync";
import { UserServices } from "./User.service";


const createUser = catchAsync(async(req, res) => {
    const result = await UserServices.createUserIntoDB(req.body);

    res.status(200).json({success: true, message: "User registered successfully", data: result});
});

const loginUser = catchAsync(async(req, res) => {
    const result = await UserServices.loginUser(req.body);
    const {accessToken, user} = result;

    res.status(200).json({success: true, message: "User registered successfully", token: accessToken, data: user}); 
})

export const  UserController = {
    createUser,
    loginUser,
}