import { useState, useEffect } from 'react';
import NewTodoInput from './NewTodoInput'
import { getDoc, setDoc, updateDoc, deleteField , doc } from "firebase/firestore"

const USER_ID = window.location.hash.replace('#', '') || 'XXXXX';

const TodoList = ({ db }) => {
  const [list, setList] = useState([]);
  // useEffect(() => {
  //   getList();
  // }, []);
  // const getList = async () => {
  //   const docSnap = await getDoc(doc(db, "todo", USER_ID));
  //   if (docSnap.exists()) {
  //     console.log("Document data:", docSnap.data());
  //     setList(
  //       Object.entries(docSnap.data())
  //         .map(([id, value]) => ({ id, value }))
  //         .sort((a, b) => Number(b.id) - Number(a.id))
  //     );
  //   }
  // };
  const addTodo = async (value) => {
    // await setDoc(doc(db, "todo", USER_ID), { [new Date().getTime()]: value }, { merge: true });
    // getList();
    setList([...list, { id: [new Date().getTime()], value }]);
  }
  const deleteTodo = async (id) => {
    // await updateDoc(doc(db, "todo", USER_ID), { [id]: deleteField() });
    // getList();

    setList(list.filter(i => i.id !== id))
  }
  return (
    <>
      <NewTodoInput onSubmit = {(value) => addTodo(value)} />
      <div className="todo-item-area">
        {list.map((doc) => (
          <p key={`todo-${doc.id}`} className="todo-item">
            <span>{doc.value}</span>
            <button onClick={() => deleteTodo(doc.id)}>DEL</button>
          </p>
        ))}
      </div>
    </>
  );
};
export default TodoList;
