import css from './Reason.module.scss'

export const Reason = (props) => {
    const { img, text } = props;
    return (
        <div className={css.reason}>
            <img src={img}/>
            <p>{text}</p>
        </div>
    )
}