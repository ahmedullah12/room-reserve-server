import { Router } from "express";
import auth from "../../middlewares/auth";
import { validateRequest } from "../../middlewares/validateRequest";
import { SlotsValidations } from "./Slots.validation";
import { SlotsController } from "./Slots.controller";


const router = Router();

router.post("/", auth("admin"), validateRequest(SlotsValidations.createSlotsSchemaValidation), SlotsController.createSlots);
router.get("/availability", SlotsController.getAvailableSlots);
router.put("/:id", auth("admin"),validateRequest(SlotsValidations.updateSlotsSchemaValidation),  SlotsController.updateSlot);
router.delete("/:id", auth("admin"), SlotsController.deleteSlot);

export const SlotsRoutes = router;