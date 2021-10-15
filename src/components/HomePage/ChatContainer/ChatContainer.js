import React from "react";
import "./ChatContainer.scss";
import ChatHeader from "../ChatHeader/ChatHeader";
import avatar from "../../../images/avatar.png";
import ChatBox from "../ChatBox/ChatBox";
import SendMessage from "../SendMessage/SendMessage";

function ChatContainer() {
  return (
    <div className="chat-container">
      <ChatHeader />

      <div className="chat-content">
        <ChatBox />
        <ChatBox />
        <div className="user-box">
          <div className="avatar">
            <img src={avatar} alt="avt" />
          </div>
          <div className="chatbox">
            <p>Hi! My name is Quan</p>
            <span className="send-time">11:11 AM</span>
          </div>
        </div>

        <div className="user-box">
          <div className="avatar">
            <img src={avatar} alt="avt" />
          </div>
          <div className="chatbox">
            <p>Hi! My name is Quan</p>
            <span className="send-time">11:11 AM</span>
          </div>
        </div>
      </div>

      <SendMessage />
    </div>
  );
}

export default ChatContainer;
