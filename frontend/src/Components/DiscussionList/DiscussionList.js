import React, {useState, useEffect, useContext} from "react";
import "./style-discussion-list.css";
import {getDiscussion} from "../../Actions/discussion";
import {deleteDiscussionForUser} from "../../Actions/discussion";
import {searchDiscussion} from "../../Actions/discussion";
import {Link} from "react-router-dom";



const DiscussionList = props => {
    const [allDiscussion, setAllDiscussion] = useState([]);

    useEffect(() => {
        props.search
            ? searchDiscussion(props.search, setAllDiscussion)
            : getDiscussion(setAllDiscussion);
    }, [props.search]);

    const discussion =  allDiscussion.map(element => {
        return (
            <Link  to={`/chat/${element.title}`} className="discussion__main_item"
                  key={element.id} data-key={element.id}>
                <div className="discussion__main_item__avatar">{element.id}</div>
                <div className="discussion__main_item__name">
                    <span className="item__title_text">{element.title}</span>
                </div>
                <div
                    data-title="Удалить беседу"
                    class="item__title_btn-delete"
                    onClick={() => deleteDiscussionForUser(element.id)}
                ></div>
            </Link>
        );
    });

    return <div>{discussion}</div>;
};
export default DiscussionList;
