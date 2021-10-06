import React from 'react';
import './SuccessNotification.scss';
 
function RegisterSuccess(props) {
    const { success, title} = props
    return (
        <div className='success'>
            <div>
                <p>{success}</p>
                <button>
                    <a href='http://localhost:3000/login'>{title}</a>
                </button>
            </div>
        </div>
    )
}

export default RegisterSuccess
