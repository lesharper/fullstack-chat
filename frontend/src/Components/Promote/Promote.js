import React from "react";
import "./style-promote.css";
import chatImage from "../images/chat.svg";

const Promote = () => {
  return (
    <div className="promote">
      <div className="promote__logo">
        <img src={chatImage} alt="chat" className="promote__logo__image" no-repeat />
      </div>
      <div className="promote__text">
        Используйте новую систему, для удобного общения и обмена нужной информацией!
      </div>
    </div>
  );
};

export default Promote;
