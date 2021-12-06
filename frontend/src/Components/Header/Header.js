import React, { useContext, useEffect } from "react";
import "./style-header.css";
import { Link } from "react-router-dom";
import { AuthContext } from "../../Context/Context";
import { logout } from "../../Actions/user";

const Header = () => {
  const { isAuth, setIsAuth } = useContext(AuthContext);
  return (
    <div className="header">
      <nav className="header__nav">
        <ul className="header__nav__menu">
          <li className="header__nav__menu__item">
            <Link to="/">Главная</Link> <hr className="hr-shelf"></hr>
          </li>
          {!isAuth ? (
            <li className="header__nav__menu__item">
              <Link to="/registr">Регистрация</Link> <hr className="hr-shelf"></hr>
            </li>
          ) : (
            <li className="header__nav__menu__item">
              <Link to="/chat">Общение</Link>
              <hr className="hr-shelf"></hr>
            </li>
          )}
          {!isAuth ? (
            <li className="header__nav__menu__item">
              <Link to="/login">Войти</Link> <hr className="hr-shelf"></hr>
            </li>
          ) : (
            <li className="header__nav__menu__item">
              <Link to="/" onClick={() => logout(setIsAuth)}>
                Выйти
              </Link>
              <hr className="hr-shelf"></hr>
            </li>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default Header;
