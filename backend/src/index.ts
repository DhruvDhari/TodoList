import express, { Request,Response } from "express";
import mongoose from "mongoose";
import cors from "cors";
import "dotenv/config";
import todoRoutes from "./routes/todoRoutes";


const app=express();

app.use(cors());
app.use(express.json());


mongoose.connect(process.env.MONGO_DB as string).
then(() => 
    console.log('Connected to MongoDB'));

// app.use('/',(req:Request,res:Response)=>{
//     res.send({message:"hello bhai"})
// })
app.use('/todos', todoRoutes);


app.listen(5000,()=>{
    console.log("Server is running on port:5000");
})