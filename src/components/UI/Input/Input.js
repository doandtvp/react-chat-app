import React from 'react';
import './Input.scss';

function Input(props) {
  const { type, name, id, placeholder, value, onHandleChange, icons } = props;

  return (
    <div className='form-group'>
      <label htmlFor={name}>
        <i className={`zmdi ${icons}`}></i>
      </label>
      <input
        autoComplete='off'
        type={type}
        name={name}
        id={id}
        placeholder={placeholder}
        value={value}
        onChange={onHandleChange}
      />
    </div>
  );
}

export default Input;
