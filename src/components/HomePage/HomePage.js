import React from 'react';
import './HomePage.scss';
import Header from '../Header/Header';  

function HomePage() {
    return (
        <>
            <Header/>
            <div className='homepage'>
                <h1>this is home page content</h1>
            </div>
        </>
    )
}

export default HomePage
