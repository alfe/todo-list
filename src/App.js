import { useState } from 'react';
import NewTodoInput from './components/NewTodoInput'
import './App.css';

function App() {
  const [todo, setTodo] = useState([]);
  const delTodo = (index) => {
    setTodo(todo.filter((_, i) => (i !== index)));
  }
  return (
    <div className="App">
      <NewTodoInput onSubmit = {(value) => setTodo([ ...todo, value ])} />
      <div className="todo-item-area">
        {todo.map((todoItem, index) => (
          <p key={`todo-${index}`} className="todo-item">
            <span>{todoItem}</span>
            <button onClick={() => delTodo(index)}>DEL</button>
          </p>
        ))}
      </div>
    </div>
  );
}

export default App;
