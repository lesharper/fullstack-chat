import React, {useContext, useEffect, useState} from 'react';
import "./stylePage/style-messagepage.css"
import upload_icon from "../Components/images/upload_icon.svg"
import send_icon from "../Components/images/send_icon.svg"
import back_arrow from "../Components/images/back_arrow.svg"
import dots from "../Components/images/dots.svg"
import {useParams} from "react-router-dom";
import UserInfo from "../Components/UserInfo/UserInfo";
import {useNavigate} from "react-router";
import ScrollToBottom from "react-scroll-to-bottom"
import {UsernameContext} from "../Context/Context";
import {io} from "socket.io-client";
import Modal from "../Components/Modal/Modal";
import UsersList from "../Components/UsersList/UsersList";
import {get_one_discussion} from "../Actions/discussion";


const socket = io.connect("http://localhost:5000")

const MessangerPage = () => {
    const navigate = useNavigate()
    const {id} = useParams()
    const [discussion, setDiscussion] = useState([])
    const {usernameData} = useContext(UsernameContext)
    const [modalActive, setModalActive] = useState(false);

    const [state, setState] = useState({message: "", name: ""})
    const [chat, setChat] = useState([])

    useEffect(() => {
            get_one_discussion(id, setDiscussion)
            socket.on("message", ({name, message}) => {
                if (message) setChat([...chat, {name, message}])
            })
        },
        [chat]
    )

    const onTextChange = (e) => {
        setState({...state, message: e.target.value})
    }

    const onMessageSubmit = (e, name) => {
        const {message} = state
        socket.emit("message", {name, message})
        e.preventDefault()
        setState({message: "", name})
    }

    const renderChat = () => {
        return chat.map(({message}, index) => (
            <div key={index}>
                <div className="messageContent__block">
                    {/*<div className="messageContent__block_author">{usernameData}</div>*/}
                    <div className="messageContent__block_body">{message}</div>
                </div>
            </div>
        ))
    }

    const discussionInfo = discussion.map(element => {
        return (
            <div className="messanger-header">
                <div className="back_arrow" onClick={() => navigate(-1)}>
                    <img src={back_arrow} alt="back_arrow"/>
                    <span>Назад</span>
                </div>
                <span>{element.title}</span>
                <div className="block_detail">
                    <img src={dots} alt="dots" onClick={() => setModalActive(true)}/>
                </div>
            </div>
        )
    })

    return (
        <div className="messangerPage">
            <div className="messanger__content">
                {discussionInfo}
                <ScrollToBottom className="messanger-body">
                    {renderChat()}
                </ScrollToBottom>
                <div className="messanger-useablity">
                    <textarea name="message" onChange={e => onTextChange(e)} value={state.message}
                              className="message"></textarea>
                    <button onClick={e => onMessageSubmit(e, usernameData)}><img src={send_icon} alt="send_icon"/>
                    </button>
                </div>
            </div>
            <Modal active={modalActive} setActive={setModalActive}>
                <UsersList discussionId={id}/>
            </Modal>
        </div>
    );
}

export default MessangerPage;