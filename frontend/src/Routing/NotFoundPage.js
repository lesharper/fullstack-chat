import React from "react";
import errorImg from "../Components/images/error_found.svg";
import "./stylePage/style-notfound.css";

const NotFoundPage = () => {
  return (
    <div className="not_found">
      <div className="nf__image">
        <img src={errorImg} alt="error" className="nf__image__item" no-repeat />
      </div>
      <div className="nf__text">
        <h2>Ошибка 404</h2>
        Ресурс не найден
      </div>
    </div>
  );
};
export default NotFoundPage;
