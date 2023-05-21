import css from './Profile.module.scss'
import { useDispatch } from "react-redux";
import { removeToken } from "@/store/actions";
import { useNavigate } from "react-router-dom";

export const Profile = () => {

    const navigate = useNavigate();

    const dispatch = useDispatch();
    function logOut() {
        dispatch(removeToken());
        navigate("/");
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