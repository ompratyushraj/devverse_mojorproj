import { NextFunction, Request, Response } from "express";
import { TryCatch } from "../middlewares/error.js";
import { ControllerType, GoogleAuthRequestBody, NewUserRequestBody } from "../types/UserTypes.js";
import ErrorHandler from "../utils/errorHandler.js";
import { IUser, User } from "../models/User.js";
import { sendToken } from "../utils/Features.js";
import getDataUri from "../utils/getDataUri.js";
import { Express } from "express"

import cloudinary from 'cloudinary'
import { Course } from "../models/Course.js";
import { OAuth2Client, TokenPayload } from "google-auth-library";
interface AuthenticatedRequest extends Request {
  user?: IUser;
  file?: Express.Multer.File;
}

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID, process.env.GOOGLE_CLIENT_SECRET, 'https://devverse.onrender.com/auth/google/callback');

export const register: ControllerType = TryCatch(async (req: Request<{}, {}, NewUserRequestBody>, res: Response, next: NextFunction) => {
  const { name, email, password } = req.body;
  console.log("this", name, email, password);
  let user;
  const file = req.file as Express.Multer.File | undefined;
  console.log("this", file);
  if (!name || !email || !password || !file) {
    return next(new ErrorHandler("Please add all the fields", 400));
  }
  console.log("this above multer");
  user = await User.findOne({ email });
  if (user) {
    return next(new ErrorHandler("User already exists", 409));
  }
  const fileUri = getDataUri(file);
  console.log("this below multer");

  const mycloud = await cloudinary.v2.uploader.upload(fileUri.content);
  console.log(mycloud)
  user = await User.create({
    name,
    email,
    password,
    file: {
      public_id: mycloud.public_id,
      url: mycloud.secure_url,
    },
    authMethod: "local",


  });
  console.log("there")
  sendToken(res, user, "Registered Successfully", 201);
});
export const login: ControllerType = TryCatch(async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ErrorHandler("Please add all the fields", 400));
  }

  const user = await User.findOne({ email }).select("+password");
  // console.log(user,"this is user");
  if (!user) return next(new ErrorHandler("Invalid email or password", 401));
  console.log("over therer before passwordComparing")
  console.log(password, "this is password");
  const isMatch = await user.comparePassword(password);
  console.log(isMatch, "this is ismatch");
  if (!isMatch) return next(new ErrorHandler("Invalid credentials", 401));

  sendToken(res, user, `Welcome back`, 200);
});
//@ts-ignore
export const googleLogin: ControllerType = TryCatch(async (req:Request,res:Response,next:NextFunction)=>{
  const { tokenId } = req.body;
  //  console.log(tokenId  , "this was a main thing")
  const ticket = await client.verifyIdToken({
    idToken: tokenId,
    audience: process.env.GOOGLE_CLIENT_ID,
  });


  const payload = ticket.getPayload();

  console.log(payload, "this was a main thing")
  if (!payload) {
    return next(new ErrorHandler("Invalid Token", 401));
  }
  const { sub: googleId } = payload;


  const { name, email, picture } = payload;
  let user = await User.findOne({ googleId });
  if (user) {

    console.log("above")




    sendToken(res, user, "Logged In Successfully", 201);



  }
  if (!user) {
    return res.status(401).json({

      success: false,
      message: "User not found",
    });
  }



  //  if(!user){

  //   user=await User.create({
  //     name,
  //     email,
  //     file:{
  //       url:picture,
  //     },
  //     googleId,
  //     authMethod:"google",//matrices is the 





  //    })  
  //    sendToken(res,user,"Registered Successfully",201);
  //   }

})
  








export const logout: ControllerType = TryCatch(async (req: Request, res: Response, next: NextFunction) => {
  res
    .status(200)
    .cookie("token", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
      secure: true,
      sameSite: "none",
    })
    .json({
      success: true,
      message: "Logged Out Successfully",
    });
});
export const MyProfile: ControllerType = TryCatch(async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  if (!req.user) {
    return next(new ErrorHandler("User not found", 401));
  }
  const user = await User.findById(req.user._id);
  res.status(200).json({
    success: true,
    user,
  })
});
export const changePassword: ControllerType = TryCatch(async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const { oldPassword, newPassword } = req.body;
  if (!oldPassword || !newPassword)
    return next(new ErrorHandler("Please enter all field", 400));
  if (!req.user) {
    return next(new ErrorHandler("User not found", 401));
  }
  const user = await User.findById(req.user._id).select("+password");

  const isMatch = await user?.comparePassword(oldPassword);

  if (!isMatch) return next(new ErrorHandler("Incorrect Old Password", 400));
  if (!user) {
    return next(new ErrorHandler("User not found", 401));

  }
  user.password = newPassword;

  await user.save();

  res.status(200).json({
    success: true,
    message: "Password Changed Successfully",
  });
});
export const UpdateProfile: ControllerType = TryCatch(async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const { name, email } = req.body;
  if (!req.user) {
    return next(new ErrorHandler("User not found", 401));
  }

  const user = await User.findById(req.user._id);
  if (!user) {
    return next(new ErrorHandler("User not found", 401));
  }

  if (name) user.name = name;
  if (email) user.email = email;

  await user.save();

  res.status(200).json({
    success: true,
    message: "Profile Updated Successfully",
  })
});
export const updateprofilepicture: ControllerType = TryCatch(async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const file = req.file;
  if (!req.user) {
    return next(new ErrorHandler("User not found", 401));
  }
  if (!file) {
    return next(new ErrorHandler("File not found", 401));
  }

  const user = await User.findById(req.user._id);
  if (!user) {
    return next(new ErrorHandler("User not found", 401))
  }
  const fileUri = getDataUri(file);
  const mycloud = await cloudinary.v2.uploader.upload(fileUri.content);

  await cloudinary.v2.uploader.destroy(user.file.public_id);

  user.file = {
    public_id: mycloud.public_id,
    url: mycloud.secure_url,
  };

  await user.save();

  res.status(200).json({
    success: true,
    message: "Profile Picture Updated Successfully",
  });
});

export const updateBio: ControllerType = TryCatch(async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const id = req?.user?._id;
  if (!id) {
    return next(new ErrorHandler("User not found", 401))
  }
  const { bio } = req.body;

  const user = await User.findById(id);
   if (!user) {
    return next(new ErrorHandler("User not found", 401))
  }; 
  //@ts-ignore
  if (user?.role == "educator") { 
    
    return next(new ErrorHandler("Educators cannot update bio", 403));
  }

  console.log(user, "this is user");
 
  user.bio = bio;
  await user.save();

  res.status(200).json({
    success: true,
    message: "Bio Updated Successfully",
  });

  //  console.log(bio,id,"this is the bio and the id over there")
});
export const addToPlaylist: ControllerType = TryCatch(async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  if (!req.user) {
    return next(new ErrorHandler("User not found", 401));
  }
  console.log("here i reach")
  const user = await User.findById(req.user._id);
  if (!user) {
    return next(new ErrorHandler("User not found", 401));
  }


  const course = await Course.findById(req.params.id);
  console.log(req.body.id);
  console.log(course);

  if (!course) return next(new ErrorHandler("Invalid Course Id", 404));
  // console.log(course);
  const itemExist = user.FavouriteCourse.find((item) => {
    if (item.course.toString() === course._id.toString()) return true;
  });

  if (itemExist) return next(new ErrorHandler("Item Already Exist", 409));
  const item = user.FavouriteCourse.push({
    course: course?._id,
    poster: course?.file?.url!,
  });

  await user.save();

  res.status(200).json({
    success: true,
    message: "Added to playlist",
  });
})
export const removeFromPlaylist: ControllerType = TryCatch(async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  if (!req.user) {
    return next(new ErrorHandler("User not found", 401));
  }

  const user = await User.findById(req.user._id);
  if (!user) {
    return next(new ErrorHandler("User not found", 401));
  }

  const course = await Course.findById(req.query.id);
  if (!course) return next(new ErrorHandler("Invalid Course Id", 404));

  const newPlaylist = user.FavouriteCourse.filter((item) => {
    if (item.course.toString() !== course._id.toString()) return item;
  });

  user.FavouriteCourse = newPlaylist;
  await user.save();
  res.status(200).json({
    success: true,
    message: "Removed From Playlist",
  });
});




