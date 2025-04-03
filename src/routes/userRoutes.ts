import { Router } from "express";
import * as userController from "../controllers/userController";
import { validate } from "../middleware/validate";
import { asyncHandler } from "../middleware/asyncHandler";
import { requireAuth } from "../middleware/requireAuth";
import { authenticate } from "../middleware/auth";

import { loginSchema, registerSchema } from "../utils/userValidators";

const router = Router();

router.post(
  "/signup",
  validate(registerSchema),
  asyncHandler(userController.signup)
);
router.post(
  "/login",
  validate(loginSchema),
  asyncHandler(userController.login)
);
router.put(
  "/update",
  authenticate,
  requireAuth,
  asyncHandler(userController.update)
);
router.delete(
  "/delete",
  authenticate,
  requireAuth,
  asyncHandler(userController.remove)
);

export default router;
