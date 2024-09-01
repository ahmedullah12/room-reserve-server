"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthServices = void 0;
const http_status_1 = __importDefault(require("http-status"));
const config_1 = __importDefault(require("../../config"));
const AppError_1 = __importDefault(require("../../error/AppError"));
const Auth_utils_1 = require("./Auth.utils");
const User_model_1 = require("../User/User.model");
const signUpUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const jwtPayload = {
        email: payload === null || payload === void 0 ? void 0 : payload.email,
        name: payload === null || payload === void 0 ? void 0 : payload.name,
        role: payload === null || payload === void 0 ? void 0 : payload.role,
    };
    const accessToken = (0, Auth_utils_1.createToken)(jwtPayload, config_1.default.access_token_secret, '1d');
    const refreshToken = (0, Auth_utils_1.createToken)(jwtPayload, config_1.default.refresh_token_secret, '30d');
    const user = yield User_model_1.User.create(payload);
    return {
        accessToken,
        refreshToken,
        user,
    };
});
const loginUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield User_model_1.User.isUserExistByEmail(payload.email);
    if (!user) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'User not found');
    }
    if (!user.password) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'User not found');
    }
    const isPasswordMatch = yield User_model_1.User.isPasswordMatched(payload.password, user.password);
    if (!isPasswordMatch) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "Password doesn't match");
    }
    const jwtPayload = {
        email: user.email,
        name: user.name,
        role: user.role,
    };
    const accessToken = (0, Auth_utils_1.createToken)(jwtPayload, config_1.default.access_token_secret, '1d');
    const refreshToken = (0, Auth_utils_1.createToken)(jwtPayload, config_1.default.refresh_token_secret, '30d');
    return {
        refreshToken,
        accessToken,
        user,
    };
});
const refreshToken = (token) => __awaiter(void 0, void 0, void 0, function* () {
    // checking if the given token is valid
    const decoded = (0, Auth_utils_1.verifyToken)(token, config_1.default.refresh_token_secret);
    const { email } = decoded;
    // checking if the user is exist
    const user = yield User_model_1.User.isUserExistByEmail(email);
    if (!user) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'This user is not found !');
    }
    const jwtPayload = {
        email: user.email,
        name: user.name,
        role: user.role,
    };
    const accessToken = (0, Auth_utils_1.createToken)(jwtPayload, config_1.default.access_token_secret, "1d");
    return {
        accessToken,
    };
});
exports.AuthServices = {
    signUpUser,
    loginUser,
    refreshToken
};
