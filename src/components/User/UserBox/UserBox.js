import React from 'react';
import './UserBox.scss';
import avatar from '../../../images/avatar.png'

function UserBox() {
    return (
        <div className='user-chat'>
            <div className='avatar'>
                <img src={avatar} alt='avt' />
                <div className='status'></div>
            </div>
            <div className='username'>
                <h4>Diego</h4>
                <p>Good morning sir</p>
            </div>
            <div className='active'>
                <p>Just Now</p>
                <div className='mess-notice'>
                    <span>7</span>
                </div>
            </div>
        </div>
    )
}

export default UserBox
