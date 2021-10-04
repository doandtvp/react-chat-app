import React from 'react'

function Notification(props) {
    
    const { notification, userId } = props

    return (
        <div className={'errors'}>
            {userId === 0 && <p>{notification}</p>}
        </div>
    )
}

export default Notification
