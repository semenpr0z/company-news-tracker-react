import css from "./Search.module.scss";
// import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { SearchForm } from "./components/SearchForm/SearchForm";
import Cookies from "js-cookie";

export const Search = () => {
  // const token = useSelector((state) => state.token); а этот способ не работает, тк токен подгружается намного позже загрузки компонента.

  const token = Cookies.get("accesToken") // решил так сделать, потому что это самый быстрый и простой способ настроить редирект в случае неавторизованного способа.

  console.log(token)

  // if (!token) {
  //   return <Navigate to="/" />;
  // }

  return (
    <div className={css.wrapper}>
      <div className={css.searchFormWrapper}>
        <img src="/img/search-document.png" className={css.document}/>
        <h1 className={css.h1}>Найдите необходимые данные в пару кликов.</h1>
        <p className={css.p}>
          Задайте параметры поиска. <br></br> Чем больше заполните, тем точнее
          поиск
        </p>
        <SearchForm/>
      </div>
      <div className={css.images}/>
    </div>
  );
};
