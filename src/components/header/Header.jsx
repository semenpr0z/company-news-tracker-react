import css from "./header.module.scss";
import "@/assets/animations/burger-menu.scss";
import { useNavigate } from "react-router-dom";
import { InfoLimits } from "@/components/header/info-limits/Info-limits";
import { Profile } from "@/components/header/profile/Profile";
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/shared/buttons/Button";
import { CSSTransition } from "react-transition-group";
import { setToken } from "@/store/actions";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";
import { useSelector } from "react-redux";
import userDataService from "@/utils/services/userDataService";

export const Header = (props) => {
  const nodeRef = useRef(null);
  const links = props.pages;
  const navigate = useNavigate();
  const [limits, setLimits] = useState(null);
  const [burgerMenu, setBurgerMenu] = useState(false);

  const dispatch = useDispatch();
  useEffect(() => {
    const accessToken = Cookies.get("accessToken");
    dispatch(setToken(accessToken));
  }, [dispatch]);

  const token = useSelector((state) => state.token);

  function burgerMenuShow() {
    setBurgerMenu(!burgerMenu);
  }

  useEffect(() => {
    if (token) {
      const fetchData = async () => {
        try {
          const response = await userDataService.getInfo();
          const { eventFiltersInfo } = response.data;
          setLimits(eventFiltersInfo);
        } catch (error) {
          console.error(error);
        }
      };
      fetchData();
    }
  }, [token]);

  return (
    <>
      <header className={css.header} ref={nodeRef}>
        <img
          src="/svg/logo.svg/"
          alt="СКАН"
          onClick={() => {
            navigate("/");
          }}
        />
        <div className={`${css.container} ${!token ? css.noAuth : ""}`}>
          <nav className={css.navbar}>
            <ul className={css.links}>
              {links.map((link) => (
                <li key={link.id} className={css.link}>
                  <span onClick={() => navigate(link.path)}>{link.name}</span>
                </li>
              ))}
            </ul>
          </nav>
          {token ? (
            <>
              <InfoLimits limits={limits} />
              <Profile />
            </>
          ) : (
            <div className={css.auth}>
              <span className={css.registration}>Зарегистрироваться</span>
              <div className={css.border}></div>
              <span
                className={css.login}
                onClick={() => navigate("/authorization")}
              >
                Войти
              </span>
            </div>
          )}
          <img
            className={css.burger}
            src="/svg/icon-burgerMenu.svg/"
            alt="Открыть меню"
            onClick={burgerMenuShow}
          />
        </div>
      </header>
      <CSSTransition
        nodeRef={nodeRef}
        in={burgerMenu}
        timeout={300}
        classNames="header-expand"
        unmountOnExit
      >
        <header className={css.headerMobile} ref={nodeRef}>
          <div className={css.logoAndClose}>
            <img
              src="/svg/logo-white.svg"
              alt="СКАН"
              onClick={() => {
                navigate("/");
                if (burgerMenu) {
                  burgerMenuShow();
                }
              }}
            />
            <img
              className={css.burger}
              src="/svg/icon-close.svg"
              alt="Закрыть меню"
              onClick={burgerMenuShow}
            />
          </div>
          <nav className={css.navbar}>
            <ul className={css.links}>
              {links.map((link) => (
                <li key={link.id} className={css.link}>
                  <span
                    onClick={() => {
                      navigate(link.path);
                      burgerMenuShow();
                    }}
                  >
                    {link.name}
                  </span>
                </li>
              ))}
            </ul>
          </nav>
          {!token && (
            <div className={css.auth}>
              <div
                onClick={() => {
                  navigate("/authorization");
                  burgerMenuShow();
                }}
              >
                <Button disabled={false}>Зарегистрироваться</Button>
              </div>
              <div
                onClick={() => {
                  navigate("/authorization");
                  burgerMenuShow();
                }}
              >
                <Button disabled={false} className={"blue"}>
                  Войти
                </Button>
              </div>
            </div>
          )}
        </header>
      </CSSTransition>
    </>
  );
};
