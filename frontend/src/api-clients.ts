import axios from "axios";
import { Todo } from "../../backend/src/shared/types";

const API_BASE_URL="http://localhost:5000/todos"

export const getTodo = async() =>{
    const response=await axios.get<Todo[]>(API_BASE_URL);
      return response.data; 
}

export const createTodo = async (todo: Todo) => {
    const response = await axios.post<Todo>(API_BASE_URL, todo);
    return response.data;
};

export const updateTodo = async (id: string, todo: Partial<Todo>) => {
    
    const response = await axios.patch<Todo>(`${API_BASE_URL}/${id}`, todo);
    
    return response.data;
};

export const deleteTodo = async (id: string) => {
    const response = await axios.delete(`${API_BASE_URL}/${id}`);
    return response.data;
};