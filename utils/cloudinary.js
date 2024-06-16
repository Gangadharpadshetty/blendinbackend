import {v2 as cloudinary} from "cloudinary";
import { promises as fs } from 'fs';




    // Configuration
    cloudinary.config({ 
        cloud_name: process.env.CLOUD_NAME,
        api_key: process.env.API_KEY,
        api_secret: process.env.API_SECRET // Click 'View Credentials' below to copy your API secret
    });



    const uploadOnClodynary=async(localfilepath)=>{
        try{
            if(!localfilepath) return null;
            //upload file
            const response = await cloudinary.upload(localfilepath,{
                resource_type:"auto",
            });
            //file haa been uploaded successfully
            console.log("file is uploaded on cloudinary",response.url);
            return response;
        }
        catch(err){
              fs.unlinsync(localfilepath)//remove the locally saved temporary file as the upload operation get failed
              return null;
        }
    }
    export default uploadOnClodynary;