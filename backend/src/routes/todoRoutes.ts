import express,{Request,Response} from "express";
import Todo from "../models/todoModel";

const router = express.Router();

router.get("/",async(req:Request,res:Response)=>{
    try {
        const todos = await Todo.find();
        res.json(todos);

      } catch (err) {
        res.status(500).json({ message: "something went wrong" });
      }
});

router.post("/",async(req:Request,res:Response)=>{
    const {text,completed}=req.body;
    const todo = new Todo({
        text,
        completed
    });
    try {
        const newTodo = await todo.save();
        res.status(201).json(newTodo);
      }
       catch (err) {
        res.status(400).json({ message: "Error Occurred" });
      }
});

router.patch('/:id', async (req: Request, res: Response) => {
 
    try {
      
      const todo = await Todo.findById(req.params.id);
      if (!todo) {
        return res.status(404).json({ message: 'Todo not found' });
      }
  
      if (req.body.text !== null) {
        todo.text = req.body.text;
      }
      if (req.body.completed !== null) {
        todo.completed = req.body.completed;
      }
  
      const updatedTodo = await todo.save();
      res.json(updatedTodo);
    } catch (err) {
      res.status(400).json({ message: "Error Occurred" });
    }
  });
  
  
  router.delete('/:id', async (req: Request, res: Response) => {
    try {
      const todo = await Todo.findByIdAndDelete(req.params.id);
      if (!todo) {
        return res.status(404).json({ message: 'Todo not found' });
      }
  
      
      res.json({ message: 'Todo deleted' });
    } catch (err) {
      res.status(500).json({ message: "Error Occurred" });
    }
  });
  

export default router;