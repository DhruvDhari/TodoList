import mongoose from "mongoose";
import { Todo } from "../shared/types";

const todoSchema = new mongoose.Schema<Todo>({
    text:{type:String,required:true},
    completed:{type:Boolean,default:false}
});

const Todo = mongoose.model<Todo>("todos",todoSchema);
export default Todo;
