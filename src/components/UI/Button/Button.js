import React from 'react';

function Button(props) {
  const { type, value, name, onHandldeClick } = props;

  return (
    <div className='form-group form-button'>
      <input
        className='form-submit'
        type={type}
        name={name}
        value={value}
        onClick={onHandldeClick}
      />
    </div>
  );
}

export default Button;
