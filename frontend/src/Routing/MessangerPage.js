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


const socket = io.connect("http://localhost:5000")

const MessangerPage = () => {
    const navigate = useNavigate()
    const {title} = useParams()
    const {usernameData} = useContext(UsernameContext)


    const [ state, setState ] = useState({ message: "", name: "" })
    const [ chat, setChat ] = useState([])

    useEffect(
        () => {

            socket.on("message", ({ name, message }) => {
                setChat([ ...chat, { name, message } ])
            })
        },
        [ chat ]
    )

    const onTextChange = (e) => {
        setState({ ...state, message: e.target.value })
    }

    const onMessageSubmit = (e, name) => {
        const { message } = state
        socket.emit("message", { name, message })
        e.preventDefault()
        setState({ message: "", name })
    }

    const renderChat = () => {
        return chat.map(({message }, index) => (
            <div key={index}>
                <div className="messageContent__block">
                    {/*<div className="messageContent__block_author">{usernameData}</div>*/}
                    <div className="messageContent__block_body">{message}</div>
                </div>
            </div>
        ))
    }

    return (
        <div className="messangerPage">
            <UserInfo/>

            <div className="messanger__content">
                <div className="messanger-header">
                    <img src={back_arrow} alt="back_arrow" onClick={() => navigate(-1)}/>
                    <span>{title}</span>
                    <img src={dots} alt="dots"/>
                </div>
                    <ScrollToBottom className="messanger-body" >
                        {renderChat()}
                    </ScrollToBottom>
                <div className="messanger-useablity">
                    <section className="file"><img src={upload_icon} alt="upload"/></section>
                    <textarea name="message" onChange={e => onTextChange(e)} value={state.message} className="message"></textarea>
                    <button onClick={e => onMessageSubmit(e, usernameData)}><img src={send_icon} alt="send_icon"/></button>
                </div>

            </div>
        </div>
    );
}

export default MessangerPage;