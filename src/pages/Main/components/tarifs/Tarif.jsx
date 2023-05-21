import { Button } from "@/components/shared/buttons/Button";
import css from "./Tarif.module.scss";

export const Tarif = (props) => {
  const {
    name,
    description,
    discountPrice,
    fullPrice,
    credit,
    services,
    currentTarif,
    img,
    className,
    token,
  } = props;

  return (
    <div className={css.tarif}>
      <header
        className={`${css.header} ${name == "Beginner" ? css.beginner : ""} ${
          name == "Pro" ? css.pro : ""
        } ${name == "Business" ? css.business : ""}`}
      >
        <h4 className={`${css.h4} ${name == "Business" ? css.white : ""}`}>
          {name}
        </h4>
        <p className={`${css.p} ${name == "Business" ? css.white : ""}`}>
          {description}
        </p>
        <img className={css.img} src={img} />
      </header>
      <main
        className={`
          ${css.main} 
          ${currentTarif && name == "Beginner" && token ? css.currentTarifBeginner : ""} 
          ${currentTarif && name == "Pro" && token ? css.currentTarifPro : ""} 
          ${
            currentTarif && name == "Business" && token ? css.currentTarifBusiness : ""
          }`}
      >
        <div className={css.currentTarifText}>
          {currentTarif && token ? (
            <span className={css.text}>Текущий тариф</span>
          ) : null}
        </div>
        <div className={css.price}>
          <span className={css.discountPrice}>{discountPrice}</span>
          <span className={css.fullPrice}>{fullPrice}</span>
        </div>
        <p className={css.credit}>{credit}</p>
        <div className={css.service}>
          <h5 className={css.h5}>В тариф входит:</h5>
          <div className={css.services}>
            {services.map((service, index) => (
              <span key={index} className={css.servicesItem}>
                <img src="/svg/icon-service.svg" /> {service}
              </span>
            ))}
          </div>
        </div>
        {currentTarif && token ? (
          <Button className="gray">Перейти в личный кабинет</Button>
        ) : (
          <Button className="darkBlue">Подробнее</Button>
        )}
      </main>
    </div>
  );
};
