import React from "react";
import "./style-contents.css";
import communicate from "../images/post_item1.svg";
import discussion from "../images/post_item2.svg";
import trade from "../images/post_item3.svg";
import hash from "../images/post_item4.svg"
import masks from "../images/post_item5.svg"
import like from "../images/post_item6.svg"
import Post from "../Posts/Posts.js";

const Contents = () => {
  return (
    <div className="container">
      <Post image={communicate} description="Общайтесь с родными и близкими, на любом расстоянии!"/>
      <Post image={discussion} description="Находите людей с общими интересами" />
      <Post image={trade} description="Отправляйте важные документы коллегам" />
      <Post image={hash} description="Система хеширования данных пользователя" />
      <Post image={masks} description="Используйте любое имя. Будьте кем захотите" />
      <Post image={like} description="Делитесь интересным! Получайте отклик других пользователей!" />
    </div>
  );
};

export default Contents;
