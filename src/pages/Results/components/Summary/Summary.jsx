import css from "./Summary.module.scss";
import "./SliderStyles/SliderStyles.scss";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { PrevArrow } from "@/components/shared/sliders/PreviousSlide";
import { NextArrow } from "@/components/shared/sliders/NextSlide";

export const Summary = (props) => {
  const { searchResult } = props;

  const settings = {
    dots: false,
    infinite: false,
    variableWidth: true,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 1,
    className: "my-slider",
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    responsive: [
      {
        breakpoint: 1400,
        settings: {
          slidesToShow: 7,
        },
      },
      {
        breakpoint: 1160,
        settings: {
          slidesToShow: 6,
        },
      },
      {
        breakpoint: 910,
        settings: {
          slidesToShow: 5,
        },
      },
      {
        breakpoint: 760,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 620,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 490,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  let searchResult1 = [
    {
      data: [
        { date: "2023-02-01T03:00:00+03:00", value: 26 },
        { date: "2023-05-01T03:00:00+03:00", value: 218 },
        { date: "2023-03-01T03:00:00+03:00", value: 208 },
      ],
      histogramType: "totalDocuments",
    },
    {
      data: [
        { date: "2023-02-01T03:00:00+03:00", value: 1 },
        { date: "2023-05-01T03:00:00+03:00", value: 3 },
        { date: "2023-03-01T03:00:00+03:00", value: 6 },
      ],
      histogramType: "riskFactors",
    },
  ];

  const dataByDate = searchResult.reduce((acc, item) => {
    item.data.forEach(({ date, value }) => {
      const index = acc.findIndex((el) => el.date === date);
      if (index >= 0) {
        acc[index][item.histogramType] = value;
      } else {
        acc.push({ date, [item.histogramType]: value });
      }
    });
    return acc;
  }, []);

  const sortedDataByDate = dataByDate.sort((a, b) => new Date(a.date) - new Date(b.date)); // был вынужден отсортировать массив по датам, тк от бэкенда приходил неотсортированный(от случая к случаю)

  const tableItems = Object.values(sortedDataByDate).map(
    ({ date, totalDocuments, riskFactors }, index) => (
      <div key={index} className={css.tableItem}>
        <span>{new Date(date).toLocaleDateString()}</span>
        <span>{totalDocuments}</span>
        <span>{riskFactors}</span>
      </div>
    )
  );


  return (
    <div className={css.summary}>
      <h2>Общая сводка</h2>
      <p>Найдено {dataByDate.length} вариантов</p>
      <div className={css.sliderSummaryTable}>
        <div className={css.summaryTable}>
          <div className={css.header}>
            <span>Период</span>
            <span>Всего</span>
            <span>Риски</span>
          </div>
          <div className={css.mainTable}>
            <Slider {...settings}>{tableItems}</Slider>
          </div>
        </div>
      </div>
    </div>
  );
};


// несколько дней мучался с слайдером, чтобы он адекватно реагировал на динамическое количество элементов, но до идеала довести не удалось.