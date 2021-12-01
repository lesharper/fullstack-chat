import React from "react";
import "./stylePage/style-chatpage.css";

import Discussion from "../Components/Discussion/Discussion";
import UserInfo from "../Components/UserInfo/UserInfo";

const ChatPage = () => {
  return (
    <div className="chatPage">
      <UserInfo />
      <Discussion />
    </div>
  );
};

export default ChatPage;
