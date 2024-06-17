import { Router } from "express";
import { UserController } from "./User.controller";
import { validateRequest } from "../../middlewares/validateRequest";
import { UserValidations } from "./User.validation";


const router = Router();

router.post("/signup",validateRequest(UserValidations.createUserSchemaValidation), UserController.createUser);
router.post("/login",validateRequest(UserValidations.loginSchemaValidation), UserController.loginUser)

export const UserRoutes = router;