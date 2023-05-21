import { Summary } from "./components/Summary/Summary";
import css from "./Results.module.scss";

import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { List } from "./components/List/List";

export const Results = () => {
  const results = useSelector((state) => state.results);
  const documentIds = useSelector((state) => state.documentIds);

  if(!results){
    return <Navigate to="/" />;
  }

  return (
    <>
      <div className={css.wrapperTextAndImg}>
        <div className={css.text}>
          <h1>Ищем. Скоро будут результаты</h1>
          <p>Поиск может занять некоторое время, просим сохранять терпение.</p>
        </div>
        <img src="/img/results.png" alt="Тетенька с лупой" />
      </div>
      <Summary searchResult={results}/>
      <List documentIds={documentIds}/>
    </>
  );
};
