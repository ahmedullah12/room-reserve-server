import { Router } from "express";
import { UserController } from "./User.controller";
import auth from "../../middlewares/auth";

const router  = Router();

router.get("/",auth("admin"), UserController.getAllUser);
router.get("/user", UserController.getUser);
router.put("/make-admin/:id", UserController.makeAdmin);

export const UserRoutes = router;