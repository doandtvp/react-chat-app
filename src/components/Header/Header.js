import React from 'react';
import './Header.scss';
import { connect } from 'redux-zero/react';
import actions from '../../store/actions';

const mapToProps = (store) => store

function Header(store) {
    const { getInputValue, getAuth } = store;

    const handleLogout = () => {
        getAuth(false)
        localStorage.removeItem('token')
        const name = 'rememberLogin'
        const value = null
        getInputValue({ name, value})
    }

    return (
        <div className='header'>
            <div>
                <p>Chat App</p>
            </div>

            <ul>
                <li>Menu</li>
                <li>Account</li>
                <li>Group</li>
            </ul>

            <div className='logout'>
                <a onClick={handleLogout} href='http://localhost:3000/login' className='logout'>Logout</a>
            </div>
        </div>
    )
}

export default connect(mapToProps, actions)(Header)
