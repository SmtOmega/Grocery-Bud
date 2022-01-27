import React, {useEffect, useState} from 'react'
import './App.css';
import List from './List'
import Alert from './Alert'

const getLocalStorage = () => {
  let list = localStorage.getItem('list')
  if(list){
    return JSON.parse(list)
  }
  else {
    return []
  }
}

function App() {
  const [name, setName] = useState('');
  const [list, setList] = useState(getLocalStorage())
  const [isEditing, setIsEditing] = useState(false)
  const [alert, setAlart]= useState({show:false, msg: '', type: ''})
  const [editId, setEditId] = useState(null)
  const [oldName, setOldName] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault();
    if(!name){
      showAlert(true, 'Please add a grocery', 'danger')
    }
    else if(name && isEditing){
      setList(list.map(item =>{
        if(item.id === editId){
          return {...item, title: name}
        }
        return item
      }))
      setName('')
      setIsEditing(false)
      setEditId(null)
      showAlert(true, `${oldName} has been successfully changed to ${name}`, 'success')
    }
    else{
      const newItem = {id: new Date().getTime().toString(), title: name}
      setList([...list, newItem])
      setName('')
      showAlert(true, `${name} successfully added to list` , 'success')
    }

  }
  const showAlert = (show=false, msg='', type='' ) => {
    setAlart({show, msg, type})
  }
  const deleteItem = (id) => {
    setList(list.filter(item => item.id !== id))
    showAlert(true, 'Item successfully deleted', 'success')
  }
  const editItem = (id) => {
    setIsEditing(true)
    const itemToEdit = list.find(item => item.id === id)
    setName(itemToEdit.title)
    setOldName(itemToEdit.title)
    setEditId(id)
  }

  useEffect(()=>{
    localStorage.setItem('list', JSON.stringify(list))
  }, [list])

  return (
    <div className="App">
      <div className="grocery-container">
        <section>
          {alert.show ? <Alert {...alert} removeAlert={showAlert} list={list}/> : ''}
          <form onSubmit={handleSubmit}>
            <h3>Grocery Bud</h3>
            <div>
              <input type="text" value={name} 
              onChange={(e)=> setName(e.target.value)}
              placeholder="e.g, Cow Beans" 
              />
              <button className="btn-submit">{isEditing ? 'Edit':'Submit'}</button>
            </div>
          </form>
        </section>
        <section>
          <List items={list} deleteItem={deleteItem} editItem={editItem} />
          <button onClick={()=> setList([])} className="clear-btn">Clear all</button>
        </section>
      </div>
    </div>
  );
}

export default App;
