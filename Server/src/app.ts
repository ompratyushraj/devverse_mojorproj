import express from 'express'
import cors from 'cors'
import {errorMiddleware} from './middlewares/error.js'
import morgan from 'morgan'
import dotenv from 'dotenv'
import user from "./routes/user.js"
import course from "./routes/course.js"
import cookieParser from "cookie-parser";
// import { Server } from 'socket.io';

import { connectDB } from './utils/Features.js'
import cloudinary from 'cloudinary'
import http from 'http';



  dotenv.config({path: './.env',});

  export const envMode = process.env.NODE_ENV?.trim() || 'DEVELOPMENT';
  const port = process.env.PORT || 3000;


  const app = express();
  const server = http.createServer(app);
  connectDB(process.env.MONGO_URI as string);
  cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_CLIENT_NAME,
    api_key: process.env.CLOUDINARY_CLIENT_API,
    api_secret: process.env.CLOUDINARY_CLIENT_SECRET,
  });
  

 app.use(express.json());
 app.use(cookieParser());

 app.use(express.urlencoded({extended: true}));

app.use(cors({
  origin:[process.env.FRONTEND_URL!],
   credentials:true,
   methods:['GET','POST','PUT','DELETE'],

}));



app.use(morgan('dev')) 


app.use("/api/v1/user",user)
app.use("/api/v1/course",course)



  app.get('/', (req, res) => {
    res.send('Hello, World!');
  });

  

  
  app.get("*", (req, res) => {
    res.status(404).json({
      success: false,
      message: 'Page not found'
    });
  });

  //@ts-ignore
  app.use(errorMiddleware);
  app.listen(port, () => console.log('Server is working on Port:'+port+' in '+envMode+' Mode.'));