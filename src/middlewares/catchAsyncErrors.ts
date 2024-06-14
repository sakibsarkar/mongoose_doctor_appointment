import { NextFunction, Request, RequestHandler, Response } from "express";

const catchAsyncError = (Func: RequestHandler) =>
  (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(Func(req, res, next)).catch(next);
  };

export default catchAsyncError;
