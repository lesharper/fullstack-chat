import "./style-userinfo.css";
import defaultAvatar from "../images/default_avatar.svg"

import React, {useContext, useEffect, useState} from "react";
import { UsernameContext } from "../../Context/Context";
import { EmailContext } from "../../Context/Context";
import { IdContext } from "../../Context/Context";
import {unload} from "../../Actions/user";

const UserInfo = () => {

  const { usernameData } = useContext(UsernameContext);
  const { email } = useContext(EmailContext);
  const { id } = useContext(IdContext);
  const [avatar, setAvatar] = useState(null)

    useEffect(() => {
        unload(setAvatar)
    }, [])
  return (
    <div className="userinfo">
      <img src={avatar ? avatar : defaultAvatar} alt="defaultAvatar"  className="userinfo__avatar"/>
      <div className="userinfo__username">
        <span className="userinfo__field">Имя пользователя</span>
        <hr className="hr-userinfo"></hr>
        <span className="userinfo__username__item">{usernameData}</span>
      </div>
      <div className="userinfo__email">
        <span className="userinfo__field">Почтовый адрес</span>
        <hr className="hr-userinfo"></hr>
        <span className="userinfo__email__item">{email}</span>
      </div>
    </div>
  );
};

export default UserInfo;
