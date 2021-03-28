import { useState } from 'react';
import '../App.css';

const NewTodoInput = ({ onSubmit }) => {
  const [value, setValue] = useState('');
  const handleSubmit = () => {
    if (value.length === 0) return;
    onSubmit(value);
    setValue('');
  }
  return (
    <form className="new-todo-input">
      <input id="new-todo" value={value} onChange={e => setValue(e.target.value)} />
      <button id="submit" type="submit" disabled={value.length === 0 ? 'disabled' : ''} onClick={handleSubmit}>SEND</button>
    </form>
  );
};
export default NewTodoInput;
