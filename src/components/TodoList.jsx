import { useState, useEffect } from 'react';
import { Button, TextField, IconButton, AppBar, Tabs, Tab,
  Table, TableBody, TableRow, TableCell,
} from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import { getDoc, setDoc, updateDoc, deleteField , doc } from "firebase/firestore"
import NewTodoInput from './NewTodoInput'

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
      <AppBar id="header" position="static">
        <Tabs
          style={{ backgroundColor: '#333' }}
          value="TOP PAGE"
          indicatorColor="secondary"
          textColor="inherit"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          <Tab style={{ minWidth: 120, flexGrow: 0.05 }} label="TOP PAGE" value="TOP PAGE" />
          <Tab style={{ minWidth: 120, flexGrow: 0.05 }} label="TOOLS" value="TOOLS" />
          <Tab style={{ minWidth: 120, flexGrow: 0.05 }} label="CONTACT" value="CONTACT" />
        </Tabs>
      </AppBar>

      <div style={{ paddingBottom: '50px' }} />
      <NewTodoInput onSubmit = {(value) => addTodo(value)} />
      <div className="todo-item-area">
        {list.map((doc) => (
          <p key={`todo-${doc.id}`} className="todo-item">
            <span>{doc.value}</span>
            <button onClick={() => deleteTodo(doc.id)}>DEL</button>
          </p>
        ))}
      </div>
      <Config />
      <InfoTable />
    </>
  );
};
export default TodoList;

const Config = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <div className="config-button">
        <IconButton data-cy="config" onClick={() => setOpen(true)}>
          <SettingsIcon />
        </IconButton>
      </div>
      <Dialog maxWidth="lg" onClose={() => setOpen(false)} open={open}>
        <DialogTitle>コメントの追加</DialogTitle>
        <DialogContent style={{ padding: '8px 24px' }}>
          <TextField />

        </DialogContent>
        <DialogActions style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 24px'}}>
          <Button autoFocus onClick={() => setOpen(false)}>
            キャンセル
          </Button>
          <Button autoFocus onClick={() => setOpen(false)}>
            投稿
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

const InfoTable = () => {
  return (
    <div style={{ 
      minHeight: '80vh',
      padding: '20rem auto 10rem',
    }}>
      <Table id="info-table" style={{ 
        maxWidth: '400px',
        background: 'white',
        border: '1px solid rgba(224, 224, 224, 1)'
      }}>
        <TableBody>
          <TableRow>
            <TableCell component="th" scope="row">ユーザ名</TableCell>
            <TableCell align="left">テストユーザー１</TableCell>
          </TableRow>
          <TableRow>
            <TableCell component="th" scope="row">ユーザUUID</TableCell>
            <TableCell align="left"><span id='user-uuid'>  XXXX-XXXX-XXXX-XXXX</span></TableCell>
          </TableRow>
          <TableRow>
            <TableCell component="th" scope="row">ユーザロール</TableCell>
            <TableCell align="left">グループ管理者</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};
