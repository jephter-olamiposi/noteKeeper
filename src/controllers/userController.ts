import {Request, Response} from 'express';
export const user = (req: Request, res: Response) => {
  res.status(200).json({
    message: 'Hello from user controller',
  });
}