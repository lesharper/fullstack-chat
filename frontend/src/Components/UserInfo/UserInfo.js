import "./style-userinfo.css";
import React, { useContext } from "react";
import { UsernameContext } from "../../Context/Context";
import { EmailContext } from "../../Context/Context";
import { IdContext } from "../../Context/Context";

const UserInfo = () => {
  const { usernameData, setUsernameData } = useContext(UsernameContext);
  const { email, setEmail } = useContext(EmailContext);
  const { id, setId } = useContext(IdContext);
    console.log("Im UserInfo")
  return (
    <div className="userinfo">
      <div className="userinfo__avatar">{id}</div>
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
