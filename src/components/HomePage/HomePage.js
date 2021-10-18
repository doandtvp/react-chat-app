import React from "react";
import "./HomePage.scss";
import Sidebar from "./SideBar/Sidebar";
import ChatContainer from "./ChatContainer/ChatContainer";
import UserProfile from "../User/UserProfile/UserProfile";
import UserCP from "../User/UserCP/UserCP";
import { connect } from "redux-zero/react";

const mapToProps = store => store

function HomePage(store) {

  const { isUpdate } = store

  return (
    <>
      <div className="homepage">
        <Sidebar />
        <ChatContainer />
        <UserProfile />
        {isUpdate && <UserCP/> }
      </div>
    </>
  );
}

export default connect(mapToProps, null)(HomePage);
