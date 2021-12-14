import React, { useState, useEffect, useContext } from "react";
import "./style-discussion-list.css";
import {getDiscussion, joinDiscussion} from "../../Actions/discussion";
import { deleteDiscussionForUser } from "../../Actions/discussion";
import { searchDiscussion } from "../../Actions/discussion";
import { Link } from "react-router-dom";
import default_poster from "../images/default_poster.svg"

const DiscussionList = props => {
  const [allDiscussion, setAllDiscussion] = useState([]);
  const [poster, setPoster] = useState(null)

  useEffect(() => {
    props.search
      ? searchDiscussion(props.search, setAllDiscussion)
      : getDiscussion(setAllDiscussion);
  }, [allDiscussion]);

  const discussion = allDiscussion.map(element => {
    return (
      <div
        className="discussion__main_item"
        key={element.id}
        data-key={element.id}
        onClick={(e) => joinDiscussion(e, element.id)}
      >
        <div className="discussion__main_item__poster"><img src={default_poster} alt="default_poster"/></div>
        <Link className="discussion__main_item__name" to={`/chat/${element.id}`}>
          <span className="item__title_text">{element.title}</span>
        </Link>
        <div
          data-title="Удалить беседу"
          className="item__title_btn-delete"
          onClick={(e) => deleteDiscussionForUser(e, element.id)}
        ></div>
      </div>
    );
  });

  return <div>{discussion}</div>;
};
export default DiscussionList;
