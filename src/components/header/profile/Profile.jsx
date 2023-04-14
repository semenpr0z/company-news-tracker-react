import css from './Profile.module.scss'

export const Profile = () => {
    return(
        <div className={css.profile}>
            <div className={css.text}>
                <span className={css.name}>Алексей А.</span>
                <button className={css.logout}>Выйти</button>
            </div>
            <img src="/img/avatar.png" alt="Аватар" className={css.avatar} />
        </div>
    )
}