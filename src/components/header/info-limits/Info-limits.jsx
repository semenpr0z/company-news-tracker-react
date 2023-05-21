import css from "./Info-limits.module.scss";

export const InfoLimits = (props) => {
  if (props.limits) {
    return (
      <div>
        <table className={css.info}>
          <tbody>
            <tr className={css.string}>
              <td className={css.td}>
                <span className={css.spanThin}>Использовано компаний</span>
              </td>
              <td className={css.td}>
                <span className={css.spanBold}>{props.limits.usedCompanyCount}</span>
              </td>
            </tr>
            <tr className={css.string}>
              <td className={css.td}>
                <span className={css.spanThin}>Лимит по компаниям</span>
              </td>
              <td className={css.td}>
                <span className={[css.spanBold, css.green].join(" ")}>
                  {props.limits.companyLimit}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
        <div className={css.infoMini}>
          <div className={css.textBlock}>
            <span className={css.spanThin}>Использовано компаний</span>
            <span className={css.spanBold}>{props.limits.usedCompanyCount}</span>
          </div>
          <div className={css.textBlock}>
            <span className={css.spanThin}>Лимит по компаниям</span>
            <span className={[css.spanBold, css.green].join(" ")}>
              {props.limits.companyLimit}
            </span>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className={[css.info, css.infoEmpty].join(" ")}>
        <img src="/svg/icon-loader.svg" alt="Загрузка" />
      </div>
    );
  }
};
