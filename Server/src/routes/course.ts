import express from "express";
import { isAuthenticated } from "../middlewares/auth.js";
import singleUpload from "../middlewares/multer.js";
import { addPdfs, CreateCourse, getallCourses, getPdfDocuments } from "../controllers/course.js";
const router=express.Router();

                  
//routes
   router.post('/newcourse',isAuthenticated,singleUpload,CreateCourse);//rendering mentions
   router.post('/addocument/:id' ,singleUpload,addPdfs); //re.response.user 
   router.get('/allCourses',isAuthenticated,getallCourses);
   router.get('/getPdf/:id',isAuthenticated,getPdfDocuments);
export default router;