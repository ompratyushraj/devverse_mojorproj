import { PutObjectCommand } from "@aws-sdk/client-s3"
import s3Crendentials from "./S3Crendentials.js";

   





    const putDocs= async (file:Buffer,filename:string)=>{
 try {




     console.log(file,"this is the file");
    if (!Buffer.isBuffer(file)) {
        throw new Error("File content is not a Buffer");
    }
    const params={
        Bucket:process.env.AWS_BUCKET_NAME,
        Key:`${filename}`,
        Body:file,
        ContentType: 'application/pdf',    }


    const command=new PutObjectCommand(params);
    const data=await s3Crendentials.send(command);
    if(data.$metadata.httpStatusCode !== 200){
        return;
    }
    let url = `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${params.Key}`
    console.log(url);
    return {url,key:params.Key};

 } catch (error) {
    console.log(error);
 }
   }


   export default putDocs;