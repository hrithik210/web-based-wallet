import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

mongoose.connect(process.env.mongoUrl!).then(() => {
    console.log(`connected to mongodb: ${process.env.mongoUrl}`);
}).catch((err) => {
    console.log(`error connecting to mongodb` , err);
})
