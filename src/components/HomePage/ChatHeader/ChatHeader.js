import React from 'react';
import avatar from '../../../images/avatar.png';
import './ChatHeader.scss';

function ChatHeader() {
    return (
        <div className='chat-container__header'>
                <div className='avatar'>
                    <img src={avatar} alt='avt' />
                    <div className='status'></div>
                </div>
                <div className='current-chat'>
                    <h4>Diego (Doen)</h4>
                    <p>Active now</p>
                </div>
        </div>
    )
}

export default ChatHeader
