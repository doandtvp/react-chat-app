import React, { useState, useEffect } from "react";
import avatar from "../../../images/avatar.png";
import "./ChatHeader.scss";
import { connect } from 'redux-zero/react';
import actions from '../../../store/actions';

const mapToProps = (store) => (store)

function ChatHeader(store) {
  const [username, setUserName] = useState('')
  const userId = localStorage.getItem('userId')
  const { displayName, getUser, getNotification } = store

  useEffect(() => {
    if(userId) {
      const getUserProfile = async () => {
        try {
          const response = await fetch(`https://localhost:5001/api/Account/GetUserByID?id=${userId}`)
          const data = await response.json();  
          if(response.status === 200) {
            setUserName(data.alias)
            getUser(data)
          }
        } catch (error) {
          console.log(error)
        }
      };

      getUserProfile();
    }
  }, [userId, getUser, getNotification, displayName])
  
  return (
    <div className="chat-container__header">
      <div className="avatar">
        <img src={avatar} alt="avt" />
        <div className="status"></div>
      </div>
      <div className="current-chat">
        <h4>{username}</h4>
        <p>Active now</p>
      </div>
    </div>
  );
}

export default connect(mapToProps, actions)(ChatHeader);
