import css from "./header.module.scss";
import { useNavigate } from "react-router-dom";
import { InfoLimits } from "@/components/header/info-limits/Info-limits";
import { Profile } from "@/components/header/profile/Profile";


export const Header = (props) => {
  const links = props.pages;
  const navigate = useNavigate();
  let limits = {
    used: 34,
    limit: 100
  }

  return (
    <header className={css.header}>
      <img src="/svg/logo.svg/" alt="СКАН" />
      <div className={css.container}>
        <nav className={css.navbar}>
          <ul className={css.links}>
            {links.map((link) => (
              <li key={link.id} className={css.link}>
                <span onClick={() => navigate(link.path)}>{link.name}</span>
              </li>
            ))}
          </ul>
        </nav>
        <InfoLimits limits={limits}/>
        <Profile/>
        <img className={css.burger} src="/svg/icon-burgerMenu.svg/" alt="Меню" />
      </div>
    </header>
  );
};
