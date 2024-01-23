import React from 'react'
import './Messages.css'

const Messages = ({text,sent}) => {
  return (
    <div className={`message ${sent ? 'sent':'recieved'}`}>
        <div className='message-bubble'>{text}</div>
      
    </div>
  )
}

export default Messages
