import React from 'react';
import './SendMessage.scss'

function SendMessage() {
    return (
        <div className='send-message'>
            <div className='icons'>
                <i className="zmdi zmdi-mood"></i>
            </div>
            <div className='input-value'>
                <input type='text' placeholder='Type a message...' />
            </div>
            <div className='send-button'>
                <i className="zmdi zmdi-mail-send"></i>
            </div>
        </div>
    )
}

export default SendMessage
