import React, {useState, useEffect} from 'react';
import './App.css';
import {axios} from "./axios"
import Reminder from './components/Reminder';

function App() {

  const [reminders, setReminders] = useState([])
  const [formData, setFormData] = useState({})

const noReminders = !reminders || (reminders && reminders.length === 0)

//The Json Server is ran with LocalHost:9000

// Fetching Data from the Api using Axios
  const getReminders = async()=>{
    const response = await axios.get("/reminders").catch((err) => console.log("Error:", err))

    if(response && response.data){
setReminders(response.data)
    }
  }

  // Posting Data inputed from the Form to the Api using Axios
  const handleChange = (e) => {
    setFormData({...formData,  [e.target.name]: e.target.value})
  }

   const addReminder = async() =>{
const response = await axios.post("./reminders", formData).catch((err) => console.log("Error:", err))

if (response) getReminders();
   }

   const deleteReminder = async (id) => {
const response = await axios.delete(`./reminders/${id}`).catch((err) => console.log("Error:", err))

if(response) getReminders()
   }

  useEffect(() => {
getReminders()
  }, [])

  return (
    <div className="app">
      <div className='app-header'>
     <div className='display-reminders'>
     <h3> My Reminders</h3>
     {noReminders && <h2>No Reminders Found</h2>}
      {!noReminders && reminders.map((reminder, index ) => {
         return <Reminder key={index} {...reminder} onDelete = {deleteReminder}/>
      })}</div>
     <div className='line'></div>
     
      <form className='app-form' onSubmit={addReminder}>
      <h3>Add Reminder</h3>
        <label htmlFor='id'>Id</label>
        <input type="number" name='id' min="1" max="50" placeholder='Id' onChange={handleChange}/>
        <label htmlFor='Remainder'>Reminder</label>
        <input name='reminder' placeholder='Reminder' onChange={handleChange}/>
        <label htmlFor='Time'>Time</label>
        <input type="time" name='time' placeholder='Time' min="00:00"  onChange={handleChange}/>
        <button type="submit">Add</button>
      </form></div>
    </div>
  );
}

export default App;
