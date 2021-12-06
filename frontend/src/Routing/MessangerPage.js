import React, {useContext, useEffect, useState} from 'react';
import "./stylePage/style-messagepage.css"
import upload_logo from "../Components/images/upload-logo.svg"
import back_arrow from "../Components/images/back_arrow.svg"
import dots from "../Components/images/dots.svg"
import {useParams} from "react-router-dom";
import UserInfo from "../Components/UserInfo/UserInfo";
import {useNavigate} from "react-router";
import ScrollToBottom from "react-scroll-to-bottom"
import {UsernameContext} from "../Context/Context";

const MessangerPage = (factory, deps) => {
    const navigate = useNavigate()
    const {title} = useParams()
    const {usernameData} = useContext(UsernameContext)

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
                        {/*<div className="messageContent__block">*/}
                        {/*    <div className="messageContent__block_author">1</div>*/}
                        {/*    <div className="messageContent__block_body">2</div>*/}
                        {/*    <div className="messageContent__block_date">3</div>*/}
                        {/*</div>*/}
                    </ScrollToBottom>
                <div className="messanger-useablity">
                    <section className="file"><img src={upload_logo} alt="upload"/></section>
                    <textarea
                        name="message"
                        className="message"
                        placeholder="Напишите сообщение">
                    </textarea>
                    <button>Отправить</button>
                </div>

            </div>
        </div>
    );
}

export default MessangerPage;