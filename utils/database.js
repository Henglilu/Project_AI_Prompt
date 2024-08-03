import mongoose from "mongoose";

let isConnected = false;// track the connection

export const connectToDB = async () => {
    mongoose.set('strictQuery', true) // set mongoose option

    if(isConnected){
        console.log("MongoDB is connected")
        return;
    }
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            dbName: "share_prompt",
            useNewUrlParser: true,
            useUnifiedTopology: true,

        })
        isConnected = true;
        console.log("MongoDB is connected")
    }catch (error) {
        console.log(error);
    }
}