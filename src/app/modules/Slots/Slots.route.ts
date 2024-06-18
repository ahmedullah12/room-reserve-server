import { Router } from "express";
import auth from "../../middlewares/auth";
import { validateRequest } from "../../middlewares/validateRequest";
import { SlotsValidations } from "./Slots.validation";
import { SlotsController } from "./Slots.controller";


const router = Router();

router.post("/", auth("admin"), validateRequest(SlotsValidations.createSlotsSchemaValidation), SlotsController.createSlots);
router.get("/availability", SlotsController.getAvailableSlots)

export const SlotsRoutes = router;