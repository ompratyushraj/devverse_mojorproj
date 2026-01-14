import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload } from "jsonwebtoken";
import { User, IUser } from "../models/User.js"; 
import ErrorHandler from "../utils/errorHandler.js"; 
import { TryCatch } from './error.js';

interface AuthenticatedRequest extends Request {
  user?: IUser;//request thr
}

export const isAuthenticated = TryCatch(async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const a =req?.cookies;
  const { token } = req?.cookies;
  console.log(a,"this is the cookie")
      // console.log(token,"this is the token that were required")
  if (!token) return next(new ErrorHandler( "Not Logged In",401));

  const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;
  console.log(decoded,"this is the decoded")

  const user = await User.findById(decoded._id).exec(); 
  if (!user) return next(new ErrorHandler("User not found",401)); 

  req.user = user; 
  next();
});
