import React, { useState, useEffect } from "react";
import avatar from "../../../images/avatar.png";
import "./ChatHeader.scss";
import { connect } from "redux-zero/react";
import actions from "../../../store/actions";
import { callAPI } from "../../API";

const mapToProps = (store) => store;

function ChatHeader(store) {
  const [username, setUserName] = useState("");
  const userId = localStorage.getItem("userId");
  const { displayName, getUser, url, getNotification } = store;

  useEffect(() => {
    if (userId) {
      const getUserProfile = async () => {
        try {
          callAPI(`/Account/GetUserByID?id=${userId}`, "GET").then(
            async (response) => {
              const data = await response.json();
              if (response.status === 200) {
                setUserName(data.alias);
                getUser(data);
              }
            }
          );
        } catch (error) {
          console.log(error);
        }
      };

      getUserProfile();
    }
  }, [userId, getUser, getNotification, displayName, url]);

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
