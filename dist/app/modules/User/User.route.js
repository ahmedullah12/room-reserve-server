"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = void 0;
const express_1 = require("express");
const User_controller_1 = require("./User.controller");
const router = (0, express_1.Router)();
router.post("/signup", User_controller_1.UserController.createUser);
router.post("/login", User_controller_1.UserController.loginUser);
exports.UserRoutes = router;
