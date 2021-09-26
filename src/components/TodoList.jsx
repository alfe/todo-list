import { useState, useEffect } from 'react';
import NewTodoInput from './NewTodoInput'
import TodoListTable from './TodoListTable'
import { getDoc, setDoc, updateDoc, deleteField , doc } from "firebase/firestore"

const USER_ID = 'XXXXX';

const TodoList = ({ db }) => {
  const [list, setList] = useState([]);
  useEffect(() => {
    getList();
  });

  const getList = async () => {
    const docRef = doc(db, "todo", USER_ID);
    const docSnap = await getDoc(docRef);
    const results = [];
    if (docSnap.exists()) {
      Object.entries(docSnap.data()).forEach(([id, value]) => {
          results.push({ id, value });
      })
    }
    setList(results.sort((a, b) => Number(a.id) - Number(b.id)).reverse());
  };
  const addTodo = async (value) => {
    await setDoc(doc(db, "todo", USER_ID), { [new Date().getTime()]: value }, { merge: true });
    getList();
  }
  const deleteTodo = async (id) => {
    await updateDoc(doc(db, "todo", USER_ID), { [id]: deleteField() });
    getList();
  }
  return (
    <>
      <NewTodoInput onSubmit = {(value) => addTodo(value)} />
      <div className="todo-item-area">
        <TodoListTable list={list} onDelete={(id) => deleteTodo(id)} />
      </div>
    </>
  );
};
export default TodoList;
