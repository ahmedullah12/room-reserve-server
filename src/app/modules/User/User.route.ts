import { Router } from "express";
import { UserController } from "./User.controller";


const router = Router();

router.post("/signup", UserController.createUser);

export const UserRoutes = router;