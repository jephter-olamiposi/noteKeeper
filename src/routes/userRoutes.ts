import { Router } from "express";
import * as userController from "../controllers/userController";
import { validate } from "../middleware/validate";
import { auth } from "../middleware/auth";
import { registerSchema, loginSchema } from "../utils/userValidators";

const router = Router();

router.post("/signup", validate(registerSchema), userController.signup);
router.post("/login", validate(loginSchema), userController.login);
router.put("/update", auth, userController.update);
router.delete("/delete", auth, userController.remove);

export default router;
