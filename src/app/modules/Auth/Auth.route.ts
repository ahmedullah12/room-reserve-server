import { Router } from "express";
import { validateRequest } from "../../middlewares/validateRequest";
import { AuthValidations } from "./Auth.validation";
import { AuthController } from "./Auth.controller";


const router = Router();

router.post("/signup",validateRequest(AuthValidations.createUserSchemaValidation), AuthController.signUp);
router.post("/login",validateRequest(AuthValidations.loginSchemaValidation), AuthController.login)
router.post(
    '/refresh-token',
    validateRequest(AuthValidations.refreshTokenValidationSchema),
    AuthController.refreshToken,
  );

export const AuthRoutes = router;