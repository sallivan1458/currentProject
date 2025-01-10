import classes from "./SignInBtn.module.scss"
import {useNavigate} from "react-router-dom";

interface ISignInBtnProps {
    title?: string,
    onclick?: () => void,
}

export default function SignInBtn({}:ISignInBtnProps){
    const navigate = useNavigate();
    return (
        <button className={classes.btn}
                onClick={() => { navigate("/login") }}>
            <p>sign in</p>
            {/*<SignInSVG className={classes.signIn}/>*/}
        </button>
    )
}