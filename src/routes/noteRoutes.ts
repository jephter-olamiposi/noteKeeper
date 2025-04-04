import { Router } from "express";
import * as noteController from "../controllers/noteController";
import { validate } from "../middleware/validate";
import { auth } from "../middleware/auth";
import { noteSchema } from "../utils/noteValidators";

const router = Router();

router.use(auth);

router.post("/", validate(noteSchema), noteController.create);
router.get("/", noteController.getAll);
router.get("/:id", noteController.getOne);
router.put("/:id", noteController.update);
router.delete("/:id", noteController.remove);

export default router;
