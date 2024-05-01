import  { useState, useEffect } from 'react';
import { Todo } from '../../../backend/src/shared/types';
import { getTodo, createTodo, updateTodo, deleteTodo } from '../api-clients';


function TodoList() {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [newTodo, setNewTodo] = useState("");
    const [editingTodo, setEditingTodo] = useState<string | null>(null);
    const [editedTodoText, setEditedTodoText] = useState("");

    useEffect(() => {
        fetchTodos();
    }, []);

    const fetchTodos = async () => {
        const fetchedTodos = await getTodo();
        setTodos(fetchedTodos);
    };

    const handleAddTodo = async () => {
        if (newTodo) {
            const todo = await createTodo({ text: newTodo, completed: false });
            setTodos([...todos, todo]);
            setNewTodo("");
        }
    };



    const handleEditTodo = (todoId: string) => {
        setEditingTodo(todoId);
        const todo = todos.find(todo => todo._id === todoId);
        if (todo) {
            setEditedTodoText(todo.text);
        }
    };

    const handleSaveEditTodo = async () => {
        if (editingTodo && editedTodoText) {
            const updatedTodo = await updateTodo(editingTodo, { text: editedTodoText });
            const updatedTodos = todos.map(todo => todo._id === updatedTodo._id ? updatedTodo : todo);
            setTodos(updatedTodos);
            setEditingTodo(null);
            setEditedTodoText("");
        }
    };

    const handleDeleteTodo = async (id: string) => {
        await deleteTodo(id);
        const updatedTodos = todos.filter(t => t._id !== id);
        setTodos(updatedTodos);
    };

    return (
        <div>
            <input
            className='main-text'
                type="text"
                value={newTodo}
                onChange={e => setNewTodo(e.target.value)}
                placeholder="Add new todo"
            />
            <button onClick={handleAddTodo}>Add</button>
            <ul>
                {todos.map(todo => (
                    <li key={todo._id}>
                        {editingTodo === todo._id ? (
                            <>
                                <input
                                className='inner-line'
                                    type="text"
                                    value={editedTodoText}
                                    onChange={e => setEditedTodoText(e.target.value)}
                                />
                                <button onClick={handleSaveEditTodo}>Save</button>
                            </>
                        ) : (
                            <>
                            <div className="line">

                                
                                    {todo.text}
                                
                                        </div>
                                <div className="buttons">

                                <button onClick={() => handleEditTodo(todo._id!)}>Edit</button>
                                <button onClick={() => handleDeleteTodo(todo._id!)}>Delete</button>
                                </div>
                            </>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default TodoList;
