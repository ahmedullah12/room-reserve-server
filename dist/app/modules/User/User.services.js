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
exports.UserServices = void 0;
const QueryBuilder_1 = __importDefault(require("../../builder/QueryBuilder"));
const User_model_1 = require("./User.model");
const getAllUser = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const userQuery = new QueryBuilder_1.default(User_model_1.User.find(), query).paginate();
    const result = yield userQuery.modelQuery;
    const meta = yield userQuery.countTotal();
    return { result, meta };
});
const getUserData = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield User_model_1.User.findOne({ email: payload });
    return user;
});
const makeAdmin = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield User_model_1.User.findByIdAndUpdate(id, { role: 'admin' }, { new: true });
    return result;
});
exports.UserServices = {
    getAllUser,
    getUserData,
    makeAdmin,
};
