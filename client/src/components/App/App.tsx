import classes from "./App.module.scss"
import {Outlet, useNavigate} from "react-router-dom";
import SignInBtn from "@/components/Button/SignInBtn";


export default function App(){
    const navigate = useNavigate()
    return (

        <>
            <header className={classes.header}>
                <nav className={classes.nav}>
                    <SignInBtn/>
                </nav>
            </header>
            <main>
                <Outlet/>
            </main>
        </>
    )
}