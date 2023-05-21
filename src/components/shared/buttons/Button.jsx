import css from "./Button.module.scss";
import { useNavigate } from "react-router-dom";

export const Button = (props) => {
  const {
    children,
    className,
    disabled,
    short,
    type,
    onClickFunction,
    path,
    customWidth,
    textMini
  } = props;
  const navigate = useNavigate();

  function methodOnClick() {
    switch (onClickFunction) {
      case "navigate":
        navigate(`${path}`);
    }
  }

  return (
    <button
      className={`${css.button} ${className == "blue" ? css.blue : ""} ${
        className == "darkBlue" ? css.darkBlue : ""
      } ${className == "gray" ? css.gray : ""} ${short ? css.short : ""} ${
        textMini ? css.textMini : ""
      }`}
      disabled={disabled}
      type={type}
      onClick={methodOnClick}
      style={{ width: customWidth ? `${customWidth}px` : `` }}
    >
      {children}
    </button>
  );
};
