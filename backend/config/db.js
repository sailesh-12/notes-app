import mongoose  from "mongoose";
import dotenv from 'dotenv'
dotenv.config();
const connectDb=async ()=>{
    try{
        //connecting to MongoDB
        const res=await mongoose.connect(process.env.MONGO_URL_LINK);        
        console.log("Mongo DB connected successfully "+process.env.MONGO_URL_LINK);
    }catch(err){
        console.log(err);
        process.exit(1); //exit with failure
    }
}


export default connectDb