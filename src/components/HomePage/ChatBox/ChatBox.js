import React from 'react';
import './ChatBox.scss';
import avatar from '../../../images/avatar.png';

function ChatBox() {
  return (
    <div className='guess-box'>
      <div className='avatar'>
        <img src={avatar} alt='avt' />
      </div>
      <div className='chatbox'>
        <p>Hi my name is Doan</p>
        <span className='send-time'>11:11 AM</span>
      </div>
    </div> 
  )
}

export default ChatBox
