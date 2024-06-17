"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const User_route_1 = require("../modules/User/User.route");
const Room_route_1 = require("../modules/Room/Room.route");
const router = express_1.default.Router();
const moduelRouter = [
    {
        path: '/auth',
        route: User_route_1.UserRoutes,
    },
    {
        path: '/rooms',
        route: Room_route_1.RoomRoutes,
    },
];
moduelRouter.forEach((route) => router.use(route.path, route.route));
exports.default = router;
