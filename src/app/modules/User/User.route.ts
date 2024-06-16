import { Router } from "express";
import { UserController } from "./User.controller";


const router = Router();

router.post("/signup", UserController.createUser);
router.post("/login", UserController.loginUser)

export const UserRoutes = router;