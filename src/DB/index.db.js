import mongoose from "mongoose";

const connectDB = async () =>{
    try{
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${process.env.PROJECT_NAME}`);
        console.log(`\n\n MongoDB connected!  \n DB Host: ${connectionInstance.connection.host}`);
    }
    catch(error){
        console.error("MongoDB Connection Failed!");
        process.exit(1);
    }
}

export default connectDB;