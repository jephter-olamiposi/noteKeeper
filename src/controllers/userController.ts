import { Request, Response } from "express";
import * as userService from "../services/userService";
import { registerSchema, loginSchema } from "../utils/userValidators";

export const signup = async (req: Request, res: Response): Promise<any> => {
  const parsed = registerSchema.safeParse(req.body);
  if (!parsed.success)
    return res.status(400).json({ errors: parsed.error.flatten().fieldErrors });

  try {
    const result = await userService.registerUser(parsed.data);
    res.status(result.status).json({ message: result.message });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const login = async (req: Request, res: Response): Promise<any> => {
  const parsed = loginSchema.safeParse(req.body);
  if (!parsed.success)
    return res.status(400).json({ errors: parsed.error.flatten().fieldErrors });

  try {
    const result = await userService.loginUser(
      parsed.data.email,
      parsed.data.password
    );
    res.status(result.status).json(result.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const update = async (req: Request, res: Response): Promise<any> => {
  const userId = req.user?.id;
  if (!userId) return res.status(401).json({ message: "Unauthorized" });

  try {
    const result = await userService.updateUser(userId, req.body);
    res.status(result.status).json({ message: result.message });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const remove = async (req: Request, res: Response): Promise<any> => {
  const userId = req.user?.id;
  if (!userId) return res.status(401).json({ message: "Unauthorized" });

  try {
    await userService.deleteUser(userId);
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
