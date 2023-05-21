import css from "./Item.module.scss";
import { Button } from "@/components/shared/buttons/Button.jsx";
import parse from "html-react-parser";

export const Item = (props) => {
  const { item } = props;

  const strippedMarkup = item.content.markup.replace(
    /<\/?(entity|sentence|speech|scandoc)[^>]*>/gi,
    ""
  ); //пытался распарсить как мог, но приходит ломаный html
  

  const date = new Date(item.issueDate).toLocaleDateString();
  
  return (
    <div className={css.item}>
      <div className={css.dateAndSource}>
        <span className={css.text}>{date}</span>
        <a className={css.text} href={item.url} target="_blank">
          {item.source.name}
        </a>
      </div>
      <a href={item.url} target="_blank">
        <h3>{item.title.text}</h3>
      </a>
      <div className={css.type}>
        {item.attributes.isTechNews && (<span className={css.tech}>Технические новости</span>)}
        {item.attributes.isAnnouncement && (<span className={css.tech}>Анонсы и события</span>)}
        {item.attributes.isDigest && (<span className={css.tech}>Сводки новостей</span>)}
      </div>
      <div className={css.mainText}>{parse(strippedMarkup)}</div>
      <div className={css.btnAndQuontity}>
        <a href={item.url} target="_blank">
          <Button className={"blue"} customWidth={223} textMini={true}>
            Читать в источнике
          </Button>
        </a>
        <span>{item.attributes.wordCount + " слов"}</span>
      </div>
    </div>
  );
};
