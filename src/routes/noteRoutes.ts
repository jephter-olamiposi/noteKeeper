import { Router } from "express";
import * as noteController from "../controllers/noteController";
import { validate } from "../middleware/validate";
import { asyncHandler } from "../middleware/asyncHandler";
import { requireAuth } from "../middleware/requireAuth";
import { authenticate } from "../middleware/auth";

import { noteSchema } from "../utils/noteValidators";

const router = Router();

router.use(authenticate, requireAuth);

router.post("/", validate(noteSchema), asyncHandler(noteController.create));
router.get("/", asyncHandler(noteController.getAll));
router.get("/:id", asyncHandler(noteController.getOne));
router.put("/:id", asyncHandler(noteController.update));
router.delete("/:id", asyncHandler(noteController.remove));

export default router;
