import css from "./Auth.module.scss";
import { AuthForm } from "./components/AuthForm/AuthForm";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export const Auth = () => {
  const token = useSelector((state) => state.token);
  if (token) {
    return <Navigate to="/" />;
  }
  return (
    <div className={css.container}>
      <div className={css.text}>
        <h1>Для оформления подписки на тариф, необходимо авторизоваться.</h1>
        <img src="/img/background-auth.png" alt="" />
      </div>
      <AuthForm />
      <img className={css.img} src="/img/background-auth.png" alt="" />
    </div>
  );
};
