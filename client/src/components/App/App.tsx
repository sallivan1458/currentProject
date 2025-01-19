import classes from "./App.module.scss"
import {Outlet, useNavigate} from "react-router-dom";
import CustomLinkBtn from "@/components/CustomLink/CustomLinkBtn";


export default function App(){
    const navigate = useNavigate()
    return (

        <>
            <header className={classes.header}>
                <nav className={classes.nav}>
                    <CustomLinkBtn to={"login"} title={"sign in"} color={"D9B08C"} size={"m"}/>
                    <CustomLinkBtn to={"chat"} title={"chat"} color={"D9B08C"} size={"m"}/>
                    <CustomLinkBtn to={"/"} title={"home"} color={"D9B08C"} size={"m"}/>
                </nav>
            </header>
            <main>
                <Outlet/>
            </main>
        </>
    )
}