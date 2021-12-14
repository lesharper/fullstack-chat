import React, {useContext, useEffect, useState} from 'react';
import "./style-userlist.css"
import {delete_full_discussion, get_all_chatUser, get_creator, kick_user} from "../../Actions/discussion";
import {IdContext, UsernameContext} from "../../Context/Context";
import {useNavigate} from "react-router";

const UsersList = ({discussionId}) => {

    const navigate = useNavigate()
    const [allUsersChat, setAllUsersChat] = useState([])
    const [creator, setCreator] = useState()
    const {id} = useContext(IdContext)

    useEffect(() => {
        get_all_chatUser(discussionId, setAllUsersChat)
        get_creator(discussionId, setCreator)
    }, [allUsersChat])

    const users = allUsersChat.map(element => {
        return (
            <div className="block_users_info">
                <span className="block_users_info-item">{element.username}</span>
                <span className="block_users_info-item">{element.id == creator ? "администратор" : "участник"}</span>
                {
                    creator == id && element.id != id
                    ?  <span className="delete_user-btn" onClick={() => kick_user(element.id, discussionId)}>&#10006;</span> : <span className="delete_user-btn"></span>
                }
            </div>

        )
    })
    return (
        <div className="block_users">
            <span className="block_users_title" style={{fontSize:"1.3em"}}>Участники беседы</span>
            <hr/>
            {users}
            {
                creator == id
                ?     <button className="delete_discussion-btn" onClick={() => {
                    delete_full_discussion(discussionId)
                    navigate(-1)
                    }}>Удалить беседу</button>
                : ""
            }

        </div>
    );
}

export default UsersList;