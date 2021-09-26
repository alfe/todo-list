const TodoListTable = ({ list, onDelete }) => {
  return (
    <>
      {list.map((doc) => (
        <p key={`todo-${doc.id}`} className="todo-item">
          <span>{doc.value}</span>
          <button onClick={() => onDelete(doc.id)}>DEL</button>
        </p>
      ))}
    </>
  );
}
export default TodoListTable;
