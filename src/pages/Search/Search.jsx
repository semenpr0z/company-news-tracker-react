import css from "./Search.module.scss";
import { SearchForm } from "./components/SearchForm/SearchForm";

export const Search = () => {

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
