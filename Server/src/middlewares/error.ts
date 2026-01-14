import { NextFunction, Request, Response } from "express";
import {ControllerType} from "../types/UserTypes.js"
import ErrorHandler from "../utils/errorHandler.js";
export const errorMiddleware = (
  err: Error | ErrorHandler,
  req: Request,
  res: Response,
  next: NextFunction
): Response => {
  let statusCode = 500; // Default to Internal Server Error
  let message = "Internal Server Error"; // Default message

  // Determine if the error is an instance of ErrorHandler
  if (err instanceof ErrorHandler) {
    statusCode = err.statusCode;
    message = err.message;
  } else if (err instanceof Error) {
    // Handle generic Error cases
    // if (err.name === "CastError") {
    //   message = "Invalid ID";
    //   statusCode = 400; // Bad Request for invalid ID
    // }
  }

  return res.status(statusCode).json({
    success: false,
    message,
  });
};


export const TryCatch =
  (func: ControllerType) =>
  (req: Request, res: Response, next: NextFunction) => {
    return Promise.resolve(func(req, res, next)).catch(next);
  };
