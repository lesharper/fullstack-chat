import React from "react";
import "./style-post.css";

const Post = (props) => {
  return (
    <div className="post">
      <div className="post__image">
        <img src={props.image} alt="" className="post__image__item" />
      </div>
      <div className="post__desc">
        <span className="post__desc__text">{props.description}</span>
      </div>
    </div>
  );
};

export default Post;
