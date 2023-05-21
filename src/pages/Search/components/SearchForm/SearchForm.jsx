import css from "./SearchForm.module.scss";
import { Button } from "@/components/shared/buttons/Button";
import { validateInn } from "@/utils/validators/validators";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setResults, setDocumentIds } from "@/store/actions";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./DatePicker.scss";
import ru from "date-fns/locale/ru";
import searchDataService from "@/utils/services/searchDataService";

export const SearchForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [pending, setStatusPending] = useState(false);
  const [inn, setInn] = useState("");
  const [innError, setInnError] = useState("");

  const [tonality, setTonality] = useState("any");
  const [quantity, setQuantity] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [datesError, setDatesError] = useState("");

  const [maxFullness, setMaxFullnes] = useState(false);
  const [inBusinessNews, setInBusinessNews] = useState(false);
  const [onlyMainRole, setOnlyMainRole] = useState(false);
  const [onlyWithRiskFactors, setOnlyWithRiskFactors] = useState(false);
  const [excludeTechNews, setExcludeTechNews] = useState(false);
  const [excludeAnnouncements, setExcludeAnnouncements] = useState(false);
  const [excludeDigests, setExcludeDigests] = useState(false);

  const handleInnChange = (value) => {
    setInn(value);
    const error = { code: null, message: null };
    const isValid = validateInn(value, error);
    if (!isValid) {
      setInnError(error.message);
    } else {
      setInnError("");
    }
  };

  const handleStartDateChange = (value) => {
    const error = "Введите корректные данные"
    const today = new Date();
    const firstDate = new Date(value)
    const secondDate = new Date(endDate)
    setStartDate(value);
    if (firstDate <= today) {
      if (firstDate > secondDate && endDate) {
        setDatesError(error);
      } else {
        setDatesError("");
      }
    } else {
      setDatesError(error);
    }

  };

  const handleEndDateChange = (value) => {
    const error = "Введите корректные данные"
    const today = new Date();
    const firstDate = new Date(startDate)
    const secondDate = new Date(value)
    setEndDate(value);
    if (secondDate <= today) {
      if (firstDate > secondDate && startDate) {
        setDatesError(error);
      } else {
        setDatesError("");
      }
    } else {
      setDatesError(error);
    }

  };

  const isFormValid =
    !innError && quantity !== "" && (startDate !== null) && (endDate !== null) && !datesError;

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatusPending(true);
    try {
      const firstResponse = await searchDataService.searchRequest(
        startDate,
        endDate,
        quantity,
        inn,
        maxFullness,
        inBusinessNews,
        onlyMainRole,
        tonality,
        onlyWithRiskFactors,
        excludeTechNews,
        excludeAnnouncements,
        excludeDigests
      );
      dispatch(setResults(firstResponse.data.data));
      const secondResponce = await searchDataService.searchRequestList(
        startDate,
        endDate,
        quantity,
        inn,
        maxFullness,
        inBusinessNews,
        onlyMainRole,
        tonality,
        onlyWithRiskFactors,
        excludeTechNews,
        excludeAnnouncements,
        excludeDigests
      );
      dispatch(setDocumentIds(secondResponce.data.items));
      setStatusPending(false);
      navigate("/results");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <form className={css.searchForm} onSubmit={handleSubmit}>
      <div className={css.textInputs}>
        <label>
          <span>
            ИНН компании
            <b className={`${innError.length ? css.errorSpan : ""}`}>*</b>
          </span>
          <input
            type="text"
            placeholder="10 цифр"
            className={`${innError.length ? css.invalid : ""}`}
            onChange={(e) => handleInnChange(e.target.value)}
          />
          <span className={css.error}>{innError}</span>
        </label>
        <label>
          <span>Тональность</span>
          <select
            defaultValue="any"
            name="tonality"
            onChange={(e) => setTonality(e.target.value)}
          >
            <option value="positive">Позитивная</option>
            <option value="negative">Негативная</option>
            <option value="any">Любая</option>
          </select>
        </label>
        <label>
          <span>
            Количество документов в выдаче<b>*</b>
          </span>
          <input
            type="number"
            min={1}
            max={1000}
            placeholder="От 1 до 1000"
            onChange={(e) => setQuantity(e.target.value)}
          />
        </label>
        <div className={css.wrapperDates}>
          <span className={css.name}>
            Диапазон поиска
            <b className={`${datesError ? css.errorSpan : ""}`}>*</b>
          </span>
          <div className={css.dates}>
            <div className={css.wrapperDate}>
              <DatePicker
                locale={ru}
                placeholderText={
                  startDate ? startDate.toLocaleDateString() : "Дата начала"
                }
                showPopperArrow={true}
                onChange={(date) => handleStartDateChange(date)}
                selected={startDate}
                className={`${datesError.length ? css.invalid : ""}`}
              />
              <img src="/svg/icon-arrow.svg/" />
            </div>

            <div className={css.wrapperDate}>
              <DatePicker
                locale={ru}
                placeholderText={endDate ? endDate : "Дата конца"}
                onChange={(date) => handleEndDateChange(date)}
                selected={endDate}
                className={`${datesError.length ? css.invalid : ""}`}
              />
              <img src="/svg/icon-arrow.svg/" />
            </div>
          </div>
          <span className={css.error}>{datesError}</span>
        </div>
      </div>
      <div className={css.checkboxesAndBtn}>
        <div className={css.checkboxes}>
          <label>
            <input
              type="checkbox"
              onChange={(e) => setMaxFullnes(e.target.checked)}
              className={css.checkboxInput}
            />
            <span className={css.checkboxLabel}>
              Признак максимальной полноты
            </span>
          </label>
          <label>
            <input
              type="checkbox"
              onChange={(e) => setInBusinessNews(e.target.checked)}
              className={css.checkboxInput}
            />
            <span className={css.checkboxLabel}>
              Упоминания в бизнес-контексте
            </span>
          </label>
          <label>
            <input
              type="checkbox"
              onChange={(e) => setOnlyMainRole(e.target.checked)}
              className={css.checkboxInput}
            />
            <span className={css.checkboxLabel}>Главная роль в публикации</span>
          </label>
          <label>
            <input
              type="checkbox"
              onChange={(e) => setOnlyWithRiskFactors(e.target.checked)}
              className={css.checkboxInput}
            />
            <span className={css.checkboxLabel}>
              Публикации только с риск-факторами
            </span>
          </label>
          <label>
            <input
              type="checkbox"
              onChange={(e) => setExcludeTechNews(e.target.checked)}
              className={css.checkboxInput}
            />
            <span className={css.checkboxLabel}>
              Включать технические новости рынков
            </span>
          </label>
          <label>
            <input
              type="checkbox"
              onChange={(e) => setExcludeAnnouncements(e.target.checked)}
              className={css.checkboxInput}
            />
            <span className={css.checkboxLabel}>
              Включать анонсы и календари
            </span>
          </label>
          <label>
            <input
              type="checkbox"
              onChange={(e) => setExcludeDigests(e.target.checked)}
              className={css.checkboxInput}
            />
            <span className={css.checkboxLabel}>Включать сводки новостей</span>
          </label>
        </div>
        <div className={css.button}>
          <Button
            className="darkBlue"
            customWidth="305"
            disabled={!isFormValid}
            type="submit"
            pending={pending}
          >
            Поиск
          </Button>
          <span className={css.text}>* Обязательные к заполнению поля</span>
        </div>
      </div>
    </form>
  );
};
