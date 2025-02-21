import mongoose from "mongoose";

const dbConnect = async()=>{
    try{
        await mongoose.connect(process.env.dburl);
        console.log("db Connected");
    }
    catch(err){
        console.log(err)
    }
    }

export default dbConnect;
