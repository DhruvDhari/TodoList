import "./App.css";
import TodoList from "./components/TodoList";

function App() {
  return (
    <>
      <div className="container">
        <header className="head">
          <h1>Todo List</h1>
          
        </header>
        <div className="body">
        <TodoList />
        </div>
        
      </div>
    </>
  );
}

export default App;
