import React from 'react'

function ErrorMessage(props) {

    const { error } = props

    return (
        <div>
            <p className='errors'>{error}</p>
        </div>
    )
}

export default ErrorMessage
