import css from "./List.module.scss";
import { Button } from "@/components/shared/buttons/Button.jsx";
import { Item } from "./Item/Item";
import searchDataService from "@/utils/services/searchDataService";
import { useState, useEffect } from "react";

export const List = (props) => {
  const { documentIds } = props;
  const mappedDocumentsIds = documentIds.map((item) => item.encodedId);
  const [counter, setCounter] = useState(4);
  const [fulledList, setFulledList] = useState(false);
  const [arrItems, setArrItems] = useState([]);
  const [pending, setStatusPending] = useState(false);

  const handleGetDocuments = async () => {
    setStatusPending(true)
    const currentIds = mappedDocumentsIds.slice(counter - 2, counter);
    if (currentIds.length) {
      try {
        const response = await searchDataService.getDocuments(currentIds);
        let newItems = [];
        if (currentIds.length >= 2) {
          newItems = [response.data[0].ok, response.data[1].ok];
          setCounter(counter + 2);
        } else if (currentIds.length === 1) {
          newItems = [response.data[0].ok];
          setCounter(counter + 1);
          setFulledList(true)
        }

        setArrItems((prevArrItems) => [...prevArrItems, ...newItems]);
        setStatusPending(false)
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    const getInitialDocuments = async () => {
      const currentIds = mappedDocumentsIds.slice(0, 2);

      try {
        const response = await searchDataService.getDocuments(currentIds);

        setArrItems([response.data[0].ok, response.data[1].ok]);
      } catch (error) {
        console.log(error);
      }
    };

    getInitialDocuments();
  }, []);

  return (
    <div className={css.wrapperList}>
      {/* <h2>Список документов</h2> */}
      <div className={css.itemsList}>
        {arrItems.map((item) => (
          <Item item={item} key={item.id} />
        ))}
      </div>
      {!fulledList && (
        <div className={css.btnWrapper} onClick={handleGetDocuments}>
          <Button className={"darkBlue"} short={true} pending={pending}>
            Показать больше
          </Button>
        </div>
      )}
    </div>
  );
};
