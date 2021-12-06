import "./style-registr.css";
import React, {useState, useEffect} from "react";
import {useInput} from "../../Hooks/useInput";
import {registration} from "../../Actions/user.js";
import {useNavigate} from "react-router-dom";

const Registration = () => {
    const [avatar, setAvatar] = useState(null)

    const navigate = useNavigate();
    const [answer, setAnswer] = useState("");
    const [isRegister, setIsRegister] = useState(false);

    useEffect(() => {
        if (isRegister) {
            navigate("/login");
        }
    }, [isRegister, navigate]);

    const username = useInput("", {isEmpty: true, minLength: 3, maxLength: 30});
    const email = useInput("", {
        isEmpty: true,
        minLength: 5,
        maxLength: 40,
        isEmail: false,
    });
    const password = useInput("", {isEmpty: true, minLength: 7});
    const confirm = useInput("", {
        isEmpty: true,
        minLength: 7,
        confirm: password.value,
    });

    return (
        <div className="validation">
            <form className="validation__form">
                <span className="validation__title">Регистрация</span>
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

                {confirm.isDirty && confirm.isEmpty && (
                    <div className="error">Поле не может быть пустым</div>
                )}
                {confirm.isDirty && !confirm.confirm && (
                    <div className="error">Пароли должны совпадать</div>
                )}
                <input
                    onChange={e => confirm.onChange(e)}
                    onBlur={e => confirm.onBlur(e)}
                    value={confirm.value}
                    name="confirm"
                    type="password"
                    className="validation__form__item"
                    placeholder="Подтвердите пароль..."
                />
                <input type="file" name="avatar"  className="validation__form__item" onChange={e => setAvatar(e.target.files[0])}/>
                <button
                    disabled={
                        !email.inputValid ||
                        !username.inputValid ||
                        !password.inputValid ||
                        !confirm.inputValid
                    }
                    type="submit"
                    className="validation__form__button"
                    onClick={e =>
                        registration(
                            e,
                            setAnswer,
                            setIsRegister,
                            username.value,
                            email.value,
                            password.value,
                            avatar
                        )
                    }
                >
                    Зарегистрироваться
                </button>
                <span className={isRegister ? "success" : "error"}>{answer}</span>
            </form>
        </div>
    );
};

export default Registration;
