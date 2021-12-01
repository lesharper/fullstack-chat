import React from "react";
import "./style-contents.css";
import communicate from "../images/post_item1.svg";
import discussion from "../images/post_item2.svg";
import trade from "../images/post_item3.svg";
import Post from "../Posts/Posts.js";

const Contents = () => {
  return (
    <div className="container">
      <Post
        image={communicate}
        description="Общайтесь с родными и близкими, на любом расстоянии!"
      />
      <Post image={discussion} description="Находите людей с общими интересами" />
      <Post image={trade} description="Отправляйте важные документы коллегам" />
    </div>
  );
};

export default Contents;
