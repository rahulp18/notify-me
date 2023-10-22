import mongoose from 'mongoose'


let isConnected=false;

export const connectToDB=async()=>{
    mongoose.set('strictQuery',true);

    if(!process.env.MONGODB_URI) return console.log(`MONGO_URI NOT EXIST`)

     if(isConnected) return console.log("Database is already connected")
     try {
        await mongoose.connect(process.env.MONGODB_URI);
        isConnected=true;
        console.log("MONGODB CONNECTED")
     } catch (error) {
        console.log(error)
     }
} 