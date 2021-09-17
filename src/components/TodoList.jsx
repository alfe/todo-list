import { useEffect } from 'react';
import { getFirestore, doc, deleteDoc } from "firebase/firestore";

const db = getFirestore();

const TodoList = ({ list, getList }) => {
  useEffect(() => {
    getList();
  }, []);

  const handleDelete = (id) => {
    (async () => {
      await deleteDoc(doc(db, "todo", id));
      getList();
    })()
  }

  return (
    <>
      {list.map((doc) => (
        <p key={`todo-${doc.id}`} className="todo-item">
          <span>{doc.value}</span>
          <button onClick={() => handleDelete(doc.id)}>DEL</button>
        </p>
      ))}
    </>
  );
}
export default TodoList;
