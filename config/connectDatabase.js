import mongoose from "mongoose"


export const connectDatabase=()=>{
    try {
        mongoose.connect(process.env.MONGODB_URL).then((res)=>{
            console.log("Database connected..")

        }).catch((err)=>{
            console.log("database connection failed",err);
            
        })
        
    } catch (error) {
        console.log(error);
        
        
    }
}