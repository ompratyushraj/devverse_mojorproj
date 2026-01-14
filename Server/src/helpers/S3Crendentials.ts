import { S3Client, S3ClientConfig } from "@aws-sdk/client-s3";
import dotenv from 'dotenv'
  dotenv.config({path: './.env',});







    const s3Crendentials = new S3Client({
    credentials:{
      accessKeyId:process.env.AWS_ACCESS_KEY!,
      secretAccessKey:process.env.AWS_SECRET_KEY!,
  
    }, 
    region:process.env.AWS_REGION!
  });

  


  export default s3Crendentials;

  

//bojan bhajan yaari dhan
