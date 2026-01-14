import { NextFunction, Request, Response } from "express";
import { TryCatch } from "../middlewares/error.js";
import { ControllerType, courseBody, SearchQuery } from "../types/UserTypes.js";
import { CreateCourseResponse } from "../types/course.js";
import ErrorHandler from "../utils/errorHandler.js";
import getDataUri from "../utils/getDataUri.js";
import cloudinary from 'cloudinary'
import { Course } from "../models/Course.js";
import { v4 as uuidv4 } from 'uuid';
// import  putObject  from "../helpers/PutDocs.js";
import putDocs from "../helpers/PutDocs.js";


import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { S3Client, GetObjectCommand, S3ClientConfig } from "@aws-sdk/client-s3";
import s3Crendentials from "../helpers/S3Crendentials.js";
import { title } from "process";

  
export const CreateCourse:ControllerType = TryCatch(async (req: Request<{}, {}, courseBody>, res: Response<CreateCourseResponse>, next: NextFunction) => {
   const {title,description,author,category}=req.body;
   const file = req.file as Express.Multer.File | undefined;  

  if (!title || !description || !author|| !category || !file){
       return next(new ErrorHandler( "Please Fill all the details",401));    
   }
   const fileUri = getDataUri(file);
   console.log("this below multer" );
 
   const mycloud = await cloudinary.v2.uploader.upload(fileUri.content);
 
    const course=Course.create({
        title,
        description,
        author,
        category,
        file:{
          public_id:mycloud.public_id,
          url:mycloud.secure_url,
      }

    })  
    res.status(201).json({
        success: true,
        message: "Course Created Successfully. You can add pdfs now.",
      }); 
      

    interface courseBody {
        title: string;
        description: string;
        author: string;
        category: string;
    }

   
});
export const getallCourses:ControllerType = TryCatch(async (req:Request<{}, {}, SearchQuery>, res: Response, next: NextFunction) => {
   const keyword=req.query.keyword || "";
   const category=req.query.category || "";
   setTimeout( ()=>{
    console.log("this is the timeout")
    
    } ,4000)

   const courses=await Course.find({
    title:{
        $regex:keyword,
        $options:"i",
    },
    category:{
        $regex:category,
        $options:"i",
    }

   }).select("-pdfs");

    
     res.status(201).json({
         success: true,
         message: courses,
       }); 
 });
 //hex code is generated twice in the manner 


export const addPdfs:ControllerType = TryCatch(async (req:Request, res: Response, next: NextFunction) => {
  try {
    const {id}=req.params;
    const {title,description}=req.body;


    const file=req?.file;

    console.log(title,description)

    if(!file) return next(new ErrorHandler("File Not found",404));

    if (!title || !description) {
      return next(new ErrorHandler("Title and description are required", 400));
    }


     const name=uuidv4()+".pdf";
    const course=await Course.findById(id);


    const fileUri = getDataUri(file);

    const data = await putDocs(fileUri?.buffer,name);
    
    
    if(!course)  return next(new ErrorHandler("Course Not found",404));
    if(!file) return next(new ErrorHandler("File Not found",404));
   console.log("before ")
     course.pdfs.push({
        title,
        description,
        documentArray:{
          ImageName:name,
          imageUrl:"",

        }

     })
     console.log("After ")

     await course.save();
console.log("after save")
     res.status(200).json({
        success: true,
        message:  "PDF added successfully",
      });   

  } catch (error) {
        console.log(error);
  }
 });
 export const getPdfDocuments: ControllerType = TryCatch(async (req: Request, res: Response, next: NextFunction) => {
  // Find the course by ID
  try {
    const course = await Course.findById(req.params.id);
    // console.log(course, "is this course");
  
    if (!course) return next(new ErrorHandler("Course not found", 404));
  
    // Process the PDFs asynchronously
    const updatedPdfs = await Promise.all(
      course.pdfs.map(async (item) => {
        const getObjectParams = {
          Bucket: process.env.AWS_BUCKET_NAME,
          Key: item?.documentArray?.ImageName,
        };
  
        const command = new GetObjectCommand(getObjectParams);
  
        // Get a signed URL for the S3 object
        const url = await getSignedUrl(s3Crendentials , command, { expiresIn: 9600 });
  
        // Update the item's image URL
        return {
          ...item,
          documentArray: {
            ...item.documentArray,
            imageUrl: url,
          },
        };
      })
    );
    course.pdfs = updatedPdfs as any;//need to fix this


    console.log(course.pdfs,"this is pdfs");
  

      res.status(200).json({
        success: true,
        course,
        message: "PDF documents retrieved successfully",
      });


      res.status(200).json({
        success: true,
        course,
        message: "PDF documents retrieved successfully",
      });
  
    }
  

  
  catch (error) {
       console.log(error,"this is error form my side")
  }
});
 export const downloadingDocs:ControllerType = TryCatch(async (req:Request, res: Response, next: NextFunction) => {
    const course=await Course.findById(req.params.id);
    if (!course) return next(new ErrorHandler("Course not found", 404));
      course.NumberOfDownloads+=1;
      await course.save();
      res.status(200).json({
         success: true,
         course,
         message: "Downloading  will start soon ",
       });   
  });
 

 
 