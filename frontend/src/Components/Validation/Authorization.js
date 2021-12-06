import "./style-registr.css";
import React, { useState, useEffect, useContext } from "react";
import { useInput } from "../../Hooks/useInput.js";
import { authorization } from "../../Actions/user.js";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../Context/Context";

const Authorization = () => {
  const navigate = useNavigate();
  const { setIsAuth } = useContext(AuthContext);
  const [answer, setAnswer] = useState("");
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    if (isLogin) {
      setIsAuth(true);
      navigate("/");
    }
  }, [isLogin]);

  const username = useInput("", { isEmpty: true, minLength: 3, maxLength: 30 });
  const email = useInput("", {
    isEmpty: true,
    minLength: 5,
    maxLength: 40,
    isEmail: false,
  });
  const password = useInput("", { isEmpty: true, minLength: 7 });

  return (
    <div className="validation">
      <form className="validation__form">
        <span className="validation__title">Авторизация</span>

        {username.isDirty && username.isEmpty && (
          <div className="error">Поле не может быть пустым</div>
        )}
        {username.isDirty && username.minLengthError && (
          <div className="error">Некорректная длина</div>
        )}
        {username.isDirty && username.maxLengthError && (
          <div className="error">Слишком длинное имя пользователя</div>
        )}
        <input
          onChange={e => username.onChange(e)}
          onBlur={e => username.onBlur(e)}
          value={username.value}
          name="username"
          type="text"
          className="validation__form__item"
          placeholder="Введите имя пользователя..."
        />

        {email.isDirty && email.isEmpty && <div className="error">Поле не может быть пустым</div>}
        {email.isDirty && email.minLengthError && <div className="error">Некорректная длина</div>}
        {email.isDirty && email.maxLengthError && (
          <div className="error">Слишком длинная почта</div>
        )}
        {email.isDirty && email.emailError && <div className="error">Введите корректную почту</div>}
        <input
          onChange={e => email.onChange(e)}
          onBlur={e => email.onBlur(e)}
          value={email.value}
          name="email"
          type="text"
          className="validation__form__item"
          placeholder="Введите почту..."
        />

        {password.isDirty && password.isEmpty && (
          <div className="error">Поле не может быть пустым</div>
        )}
        {password.isDirty && password.minLengthError && (
          <div className="error">Некорректная длина</div>
        )}
        <input
          onChange={e => password.onChange(e)}
          onBlur={e => password.onBlur(e)}
          value={password.value}
          name="password"
          type="password"
          className="validation__form__item"
          placeholder="Введите пароль..."
        />
        <button
          disabled={
            !email.inputValid || !username.inputValid || !password.inputValid
          }
          type="submit"
          className="validation__form__button"
          onClick={e =>
            authorization(
              e,
              setAnswer,
              setIsLogin,
              username.value,
              email.value,
              password.value
            )
          }
        >
          Войти
        </button>
        <span className={isLogin ? "success" : "error"}>{answer}</span>
      </form>
    </div>
  );
};

export default Authorization;
