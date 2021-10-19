import React from "react";
import "./UserProfile.scss";
import avatar from "../../../images/avatar.png";
import actions from "../../../store/actions";
import { connect } from "redux-zero/react";

const mapToProps = (store) => store;

function UserProfile(store) {
  const { getAuth, getUpdate, currentUrl, getResetAll } = store;

  const handleLogout = () => {
    getAuth(false);
    getUpdate(false)
    localStorage.clear();
    sessionStorage.clear();
    getResetAll()
  };

  const openUpdateModal = () => {
    getUpdate(true)
  }

  return (
    <div className="user-profile">
      <div className="escape">
        <i className="zmdi zmdi-arrow-left"></i>
        <a
          onClick={handleLogout}
          href={`${currentUrl}/login`}
          className="logout"
        >
          {" "}
          Logout
        </a>
      </div>
      
      <div className="user-avatar">
        <img src={avatar} alt="avatar" />
        <div className="status"></div>
      </div>
      <p>Diego</p>
      <div className="actions">
        <button className='update-button' onClick={openUpdateModal}>Update User Infomation</button>
      </div>
    </div>
  );
}

export default connect(mapToProps, actions)(UserProfile);
