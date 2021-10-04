import React from 'react';
import './SuccessNotification.scss'
import { useHistory } from 'react-router-dom';

function RegisterSuccess(props) {

    const { success, title, url } = props
    const history = useHistory();
    const successRedirect = () => {
        history.push(url)
    }

    return (
        <div className='success'>
            <p>{success}</p>
            <p>dang ky thanh cong tro ve trang dang nhap</p>
            <button onClick={successRedirect}>{title}</button>
        </div>
    )
}

export default RegisterSuccess
