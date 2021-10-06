import React from 'react'

function LogoutModal() {
    return (
        <div className='success'>
            <div>
                <p>Are you sure want to Logout ?</p>
                <button onClick={handleClick}>
                    <a href={`http://localhost:3000${url}`}>Yes</a>
                </button>

                <button onClick={handleClick}>
                    <a href={`http://localhost:3000${url}`}>No</a>
                </button>
            </div>
        </div>
    )
}

export default LogoutModal
