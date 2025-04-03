import { Request, Response } from "express";
import * as userService from "../services/userService";

export const signup = async (req: Request, res: Response) => {
  const result = await userService.registerUser(req.body);
  res.status(result.status).json({ message: result.message });
};

export const login = async (req: Request, res: Response) => {
  const result = await userService.loginUser(req.body.email, req.body.password);
  res.status(result.status).json(result.data);
};

export const update = async (req: Request, res: Response) => {
  const result = await userService.updateUser(req.user!.id, req.body);
  res.status(result.status).json({ message: result.message });
};

export const remove = async (req: Request, res: Response) => {
  await userService.deleteUser(req.user!.id);
  res.status(200).json({ message: "User deleted successfully" });
};
