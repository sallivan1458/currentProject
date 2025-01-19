import classes from './LoginPage.module.scss';
import {useNavigate} from "react-router-dom";
import {useState} from "react";

interface IInputValues {
    name: string;
    room: string;
}

export default function LoginPage() {
    const navigate = useNavigate();

    const [inputValues, setInputValues]
        = useState<IInputValues>({name:"", room:""})

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = event.target;
        setInputValues(prevValues => ({
            ...prevValues,
            [id]: value,
        }));
    }
    const handleSubmitClick = (event: React.FormEvent<HTMLFormElement>) => {
        if (inputValues.name.trim().length < 2 || inputValues.room.trim().length < 2) {
            event.preventDefault();
        } else {
            navigate(`/chat?name=${inputValues.name}&room=${inputValues.room}`)
        }
    }

    return (
        <div className={classes.background}>
            <div className={classes.wrapper}>
                <form className={classes.form} onSubmit={handleSubmitClick}>
                    <h2>Welcome</h2>
                    <div className={classes.inputField}>
                        <input
                            id="name"
                            type={"text"}
                            value={inputValues.name}
                            onChange={handleChange}
                            autoComplete="off"
                            required/>
                        <label id="name">Enter your name</label>
                    </div>
                    <div className={classes.inputField}>
                        <input
                            id="room"
                            type={"text"}
                            value={inputValues.room}
                            onChange={handleChange}
                            autoComplete="off"
                            required/>
                        <label id="room">Enter room</label>
                    </div>
                    <button
                        // onClick={handleSubmitClick}
                        type={"submit"}
                    >Connect
                    </button>
                </form>
            </div>
        </div>
    )
}