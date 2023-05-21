import css from './Footer.module.scss'

export const Footer = () => {
    return (
        <footer className={css.footer}>
            <img src="/svg/logo-white.svg" alt="СКАН" />
            <div className={css.info}>
                <span className={css.infoItem}>г. Москва, Цветной б-р, 40</span>
                <span className={css.infoItem}>+7 495 771 21 11</span>
                <span className={css.infoItem}>info@skan.ru</span>
                <span className={`${css.infoItem} ${css.copyright}`}>Copyright. 2022</span>
            </div>
        </footer>
    )
}