import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setToken } from "@/store/actions";
import Cookies from "js-cookie";
import { Button } from "@/components/shared/buttons/Button";
import css from "./AuthForm.module.scss";
import userDataService from "@/utils/services/userDataService";

export const AuthForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const isFormValid = username && password;

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!isFormValid) {
      return;
    }

    try {
      const response = await userDataService.logIn(username, password);
      const { accessToken, expire } = response.data;
      Cookies.set("accessToken", accessToken, { expires: new Date(expire) });
      dispatch(setToken(accessToken));
      navigate("/");
    } catch (error) {
      console.log(error)
      setError(true);
    }
  };

  return (
    <div className={css.authForm}>
      <img src="/svg/icon-authForm.svg/" className={css.img} />
      <header className={css.header}>
        <span className={`${css.type} ${css.logIn}`}>Войти</span>
        <span className={`${css.type} ${css.registration}`}>
          Зарегистрироваться
        </span>
      </header>
      <main className={css.main}>
        <form onSubmit={handleSubmit} className={css.form}>
          <label className={css.inputLabel}>
            <span className={css.span}>Логин или номер телефона:</span>
            <input type="text" onChange={(e) => setUsername(e.target.value)} />
          </label>
          <label className={css.inputLabel}>
            <span className={css.span}>Пароль:</span>
            <input
              className={`${error ? css.invalid : ""}`}
              type="password"
              onChange={(e) => {
                setPassword(e.target.value);
                setError(false);
              }}
            />
            {error && <span className={css.error}>Неправильный пароль</span>}
          </label>
          <Button className="darkBlue" disabled={!isFormValid} type="submit">
            Войти
          </Button>
        </form>
        <a className={css.forgotPassword} href="#">
          Восстановить пароль
        </a>
        <div className={css.socials}>
          <span className={css.text}>Войти через:</span>
          <div className={css.buttons}>
            <button>
              <img src="/svg/icon-google.svg" alt="Войти через Google" />
            </button>
            <button>
              <img src="/svg/icon-facebook.svg" alt="Войти через Facebook" />
            </button>
            <button>
              <img src="/svg/icon-yandex.svg" alt="Войти через Яндекс" />
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};
