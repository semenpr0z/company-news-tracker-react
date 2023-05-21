import css from "./Main.module.scss/";
import "@/components/shared/sliders/Slide.scss";
import { useSelector } from "react-redux";

import { Button } from "@/components/shared/buttons/Button";
import { PrevArrow } from "@/components/shared/sliders/PreviousSlide";
import { NextArrow } from "@/components/shared/sliders/NextSlide";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Reason } from "./components/reasons/Reason";
import { Tarif } from "./components/tarifs/Tarif";

const Main = () => {
  const token = useSelector((state) => state.token);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    className: 'reason-slider',
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    responsive: [
      {
        breakpoint: 1000,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 680,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  let reasons = [
    {
      img: "/svg/icon-timer.svg/",
      text: "Высокая и оперативная скорость обработки заявки",
      id: 1,
    },
    {
      img: "/svg/icon-loupe.svg/",
      text: "Огромная комплексная база данных, обеспечивающая объективный ответ на запрос",
      id: 2,
    },
    {
      img: "/svg/icon-conf.svg/",
      text: "Защита конфеденциальных сведений, не подлежащих разглашению по федеральному законодательству",
      id: 3,
    },
    {
      img: "/svg/icon-timer.svg/",
      text: "Высокая и оперативная скорость обработки заявки",
      id: 4,
    },
    {
      img: "/svg/icon-loupe.svg/",
      text: "Огромная комплексная база данных, обеспечивающая объективный ответ на запрос",
      id: 5,
    },
    {
      img: "/svg/icon-conf.svg/",
      text: "Защита конфеденциальных сведений, не подлежащих разглашению по федеральному законодательству",
      id: 6,
    },
  ];

  let tarifs = [
    {
      name: "Beginner",
      description: "Для небольшого исследования",
      discountPrice: "799 ₽",
      fullPrice: "1 200 ₽",
      credit: "или 150 ₽/мес. при рассрочке на 24 мес.",
      services: [
        "Безлимитная история запросов",
        "Безопасная сделка",
        "Поддержка 24/7",
      ],
      currentTarif: true,
      id: 1,
      img: "/svg/icon-beginner.svg",
    },
    {
      name: "Pro",
      description: "Для HR и фрилансеров",
      discountPrice: "1 299 ₽",
      fullPrice: "2 600 ₽",
      credit: "или 279 ₽/мес. при рассрочке на 24 мес.",
      services: [
        "Все пункты тарифа Beginner",
        "Экспорт истории",
        "Рекомендации по приоритетам",
      ],
      currentTarif: false,
      id: 2,
      img: "/svg/icon-pro.svg",
    },
    {
      name: "Business",
      description: "Для корпоративных клиентов",
      discountPrice: "2 379 ₽",
      fullPrice: "3 700 ₽",
      credit: "",
      services: [
        "Все пункты тарифа Pro",
        "Безлимитное количество запросов",
        "Приоритетная поддержка",
      ],
      currentTarif: false,
      id: 3,
      img: "/svg/icon-business.svg",
    },
  ];

  return (
    <>
      <section className={css.getData}>
        <div className={css.textButton}>
          <h1 className={css.h1}>
            сервис по поиску публикаций<br></br> о компании<br></br> по его ИНН
          </h1>
          <p className={css.p}>
            Комплексный анализ публикаций, получение данных в формате PDF на
            электронную почту.
          </p>
          {token && (
            <Button
              className="darkBlue"
              short={true}
              onClickFunction='navigate'
              path='/search'
            >
              Запросить данные
            </Button>
          )}
        </div>
        <img src="/img/background-main.png" />
      </section>
      <section className={css.reasons}>
        <h2 className={css.h2}>Почему именно мы</h2>
        <Slider {...settings}>
          {reasons.map((reason) => (
            <Reason img={reason.img} text={reason.text} key={reason.id} />
          ))}
        </Slider>
        <img
          src="/img/background-main-2.png"
          className={css.background}
          alt="Красивый фон"
        ></img>
      </section>
      <section className={css.tarifs}>
        <h2 className={css.h2}>наши тарифы</h2>
        <div className={css.tarifList}>
          {tarifs.map((tarif) => (
            <Tarif
              key={tarif.id}
              name={tarif.name}
              description={tarif.description}
              currentTarif={tarif.currentTarif}
              img={tarif.img}
              discountPrice={tarif.discountPrice}
              fullPrice={tarif.fullPrice}
              credit={tarif.credit}
              services={tarif.services}
              token={token}
            />
          ))}
        </div>
      </section>
    </>
  );
};

export default Main;
