import React from "react";
import "./HomePage.scss";
import Sidebar from "./SideBar/Sidebar";
import ChatContainer from "./ChatContainer/ChatContainer";
import UserProfile from "../User/UserProfile/UserProfile";

function HomePage() {
  return (
    <>
      <div className="homepage">
        <Sidebar />
        <ChatContainer />
        <UserProfile />
      </div>
    </>
  );
}

export default HomePage;
