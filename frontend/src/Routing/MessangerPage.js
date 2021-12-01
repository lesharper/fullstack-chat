import React, {useContext, useEffect, useMemo, useState} from 'react';
import "./stylePage/style-messagepage.css"
import upload_logo from "../Components/images/upload-logo.svg"
import back_arrow from "../Components/images/back_arrow.svg"
import dots from "../Components/images/dots.svg"
import {useParams} from "react-router-dom";
import UserInfo from "../Components/UserInfo/UserInfo";
import {useNavigate} from "react-router";
import {SocketContext, UsernameContext} from "../Context/Context";
import ScrollToBottom from "react-scroll-to-bottom"

const MessangerPage = (factory, deps) => {
    const navigate = useNavigate()
    const {title} = useParams()
    const {socketContext} = useContext(SocketContext)
    const {usernameData} = useContext(UsernameContext)
    const [currentMessage, setCurrentMessage] = useState("")
    const [messageList, setMessageList] = useState([])

    const sendMessage = async () => {
        if (currentMessage) {
            const messageData = {
                room: title,
                author: usernameData,
                message: currentMessage,
                time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes()
            }

            await socketContext.emit("send_message", messageData)

            setCurrentMessage("")
        }
    }

    useEffect(() => {
        socketContext.on("receive_message", (data) => {
            setMessageList((list) => [...list, data])
        return (
            socketContext.unsubscribe
        )

        }, [socketContext])
    })
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
                        {messageList.map((messageContent, index) => {
                            return (
                                <div className="messageContent__block" key={messageContent.id}>
                                    <div className="messageContent__block_author">{messageContent.author}</div>
                                    <div className="messageContent__block_body">{messageContent.message}</div>
                                    <div className="messageContent__block_date">{messageContent.time}</div>
                                </div>
                            )
                            setMessageList("")
                        })}
                    </ScrollToBottom>
                <div className="messanger-useablity">
                    <section className="file"><img src={upload_logo} alt="upload"/></section>
                    <textarea
                        name="message"
                        className="message"
                        placeholder="Напишите сообщение"
                        value={currentMessage}
                        onChange={(e) => setCurrentMessage(e.target.value)}>
                    </textarea>
                    <button onClick={() => sendMessage()}>Отправить</button>
                </div>

            </div>
        </div>
    );
}

export default MessangerPage;