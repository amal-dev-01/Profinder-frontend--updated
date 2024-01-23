import React, { useState } from 'react'

const MessageInput = () => {


    const[ inputvalue,setInputValue]=useState('')
    const handleInputChange=(e)=>{
        setInputValue(e.target.value)
    }

    const handleSendMeaasge=()=>{
        console.log('message send');
    }
  return (
    <div>
      <textarea 
      placeholder='Message'
      value={inputvalue}
      onChange={handleInputChange}
     />
     <button onClick={handleSendMeaasge}>Send</button>
    </div>
  )
}

export default MessageInput
