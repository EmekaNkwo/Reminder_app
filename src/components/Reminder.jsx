import React from 'react'
import "./Reminder.css"

export default function reminder(props) {

    const {reminder, time, id, onDelete} = props;
    

  return (
    <div className='reminder-wrapper'>
        <div className="reminder-container">
            <div className="reminder-id"><p>{id}</p></div>
                <div className="reminder"><p>{reminder}</p></div>
                    <div className="reminder-time"><p>{time}</p></div>
                    </div>
            <span className="reminder-remove" onClick={() => onDelete(id)}>❌</span>
        
        </div>
  )
}
