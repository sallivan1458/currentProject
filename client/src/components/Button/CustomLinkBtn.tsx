import classes from "./CustomLinkBtn.module.scss"
import {Link} from "react-router-dom";

interface ICustomLinkBtn {
    title?: string,
    to: string
    color?: string,
    size?: "s" | "m" | "l",
}

export default function CustomLinkBtn({title, color, to, size="m"}:ICustomLinkBtn){
    return (
        <Link
            to={to}
            style={color ? { backgroundColor: color } : {backgroundColor: "white"}}
            className={`
            ${classes.btn}
            ${size === "s" ? classes.small : size === "m" ? classes.medium : size === "l" ? classes.large : ''}
            `}
        >
            <p>{title}</p>
        </Link>
    )
}