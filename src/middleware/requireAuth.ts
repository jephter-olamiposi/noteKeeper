import { Request, Response, NextFunction } from "express";

export const requireAuth = (
  req: Request,
  res: Response,
  next: NextFunction
): any => {
  if (!req.user?.id) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  return next();
};
