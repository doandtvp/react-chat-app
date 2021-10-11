import React from 'react';
import './SideBar.scss';
import UserBox from '../../User/UserBox/UserBox';

function Sidebar() {
    return (
        <div className='sidebar'>
            <div className='search-bar'>
                <i className="zmdi zmdi-search"></i>
                <input type='text' placeholder='Search'  className='search' />
            </div>
            <hr/>
            <UserBox/>
            <UserBox/>
            <UserBox/>
        </div>
    )
}

export default Sidebar
