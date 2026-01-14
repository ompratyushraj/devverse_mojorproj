import { NextFunction, Request, Response } from "express";

export interface NewUserRequestBody {
  name: string;
  email: string;
  password: string;
  avatar: string;
}
export interface GoogleAuthRequestBody {
  tokenId: string;
  name: string;
  email: string;
  picture: string;
  googleId: string;


}
export type ControllerType = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<void>;


export interface courseBody {
  title: string;
  description: string;
  author: string;
  category: string;

}
export interface SearchQuery {
  keyword: string;
  category: string;
}