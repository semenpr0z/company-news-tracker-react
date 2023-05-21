import css from './Profile.module.scss'
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";
import { removeToken } from "@/store/actions";

export const Profile = () => {

    const dispatch = useDispatch();
    function logOut() {
        dispatch(removeToken());
        
    }
    return(
        <div className={css.profile}>
            <div className={css.text}>
                <span className={css.name}>Алексей А.</span>
                <button className={css.logout} onClick={logOut}>Выйти</button>
            </div>
            <img src="/img/avatar.png" alt="Аватар" className={css.avatar} />
        </div>
    )
}