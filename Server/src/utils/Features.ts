import { Response } from "express";
import mongoose from "mongoose";

interface User {
  getJWTToken: () => string;
}

export const sendToken = (res: Response, user: User, message: string, statusCode = 200) => {
  const token = user.getJWTToken();
  const options = {
    expires: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
    httpOnly: true,
    secure: true,
    sameSite: 'none' as const, 
  };
  res.status(statusCode).cookie("token", token, options).json({
    success: true,
    message:message,     
    user
  });
};
export const connectDB = (uri: string) => {
    mongoose
      .connect(uri, {
        dbName: "DevVerse",
      })
      .then((c) => console.log(`DB Connected to ${c.connection.host}`))
      .catch((e) => console.log(e));
  };
  