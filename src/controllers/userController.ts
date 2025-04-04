import { Request, Response } from "express";
import * as userService from "../services/userService";

export const signup = async (req: Request, res: Response) => {
  try {
    const result = await userService.registerUser(req.body);
    res.status(result.status).json({ message: result.message });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Signup failed" });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const result = await userService.loginUser(
      req.body.email,
      req.body.password
    );
    res.status(result.status).json(result.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Login failed" });
  }
};

export const update = async (req: Request, res: Response) => {
  try {
    const result = await userService.updateUser(req.user!.id, req.body);
    res.status(result.status).json({ message: result.message });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Update failed" });
  }
};

export const remove = async (req: Request, res: Response) => {
  try {
    await userService.deleteUser(req.user!.id);
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Delete failed" });
  }
};
