import { useState } from 'react';
import NewTodoInput from './components/NewTodoInput'
import TodoList from './components/TodoList'
import { initializeApp } from "firebase/app"
import { getFirestore, query, collection, getDocs, setDoc, doc } from "firebase/firestore"
import './App.css';

initializeApp({
  apiKey: process.env.REACT_APP_DEV_API_KEY,
  authDomain: process.env.REACT_APP_DEV_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_DEV_PROJECT_ID,
});

const db = getFirestore();

function App() {
  const [list, setList] = useState([]);
  const getList = async () => {
    const q = query(collection(db, "todo"));
    const querySnapshot = await getDocs(q);
    const results = [];
    querySnapshot.forEach((doc) => {
      results.push({ id: doc.id, ...doc.data() })
    });
    setList(results);
  };
  const addTodo = async (value) => {
    await setDoc(doc(collection(db, "todo")), { value: value });
    getList();
  }
  return (
    <div className="App">
      <NewTodoInput onSubmit = {(value) => addTodo(value)} />
      <div className="todo-item-area">
        <TodoList db={db} list={list} getList={getList} />
      </div>
    </div>
  );
}
export default App;
