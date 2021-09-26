import { getFirestore } from "firebase/firestore"
import { initializeApp } from "firebase/app"
import TodoList from './components/TodoList'
import './App.css';

initializeApp({
  apiKey: process.env.REACT_APP_DEV_API_KEY,
  authDomain: process.env.REACT_APP_DEV_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_DEV_PROJECT_ID,
});

const db = getFirestore();

function App() {
  return (
    <div className="App">
      <TodoList db={db} />
    </div>
  );
}
export default App;
