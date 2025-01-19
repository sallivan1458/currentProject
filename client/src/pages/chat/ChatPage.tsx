import io from "socket.io-client";
import React, {useEffect, useState} from "react";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import classes from "./ChatPage.module.scss";
import moonPNG from "../../assets/moonN.png";
import EmojiPicker from "emoji-picker-react";
import Messages, {IMessage} from "@/components/Messages/Messages";


interface ISearchParams{
    name:string;
    room:string;
}

interface IUser{
    name: string;
    room: string;
}

const socket = io("http://localhost:5013");

export default function ChatPage() {
    const {search} = useLocation();
    const [params, setParams] = useState<ISearchParams>({room:'', name:''})
    const searchParams:ISearchParams = Object.fromEntries( new URLSearchParams(location.search) ) as unknown as ISearchParams;
    const [messages, setMessages] = useState<IMessage[]>([])
    const [message, setMessage] = useState('')
    const [isOpenEmoji, setIsOpenEmoji] = useState<boolean>(false)
    const [activeUsers, setActiveUsers] = useState<number>(0)

    const navigate = useNavigate();

    useEffect(() => {
        socket.emit("join", searchParams);
        setParams(searchParams);
    }, [search]);

    useEffect(() => {
        socket.on('usersInRoom', ({ data } ) => {
            if (data) {
                const users = data.users as IUser[];
                console.log(users);
                if (users) {
                    setActiveUsers(users.length)
                }
            } else {console.log('error here')}
        })

    }, []);

    useEffect(() => {
        socket.on('message', ( {data}: {data:IMessage} ) => {
            setMessages(prevState => [...prevState, data])
        })
    }, []);


    const leaveRoom = () => {
        socket.emit("leaveRoom", {params});
        navigate('/login')
    }

    const handleInputChange = (event:React.ChangeEvent<HTMLInputElement>) =>
        setMessage(event.target.value)

    const onEmojiClick = ( {emoji}:{emoji:any} ) => {
        setMessage(`${message}${emoji}`);
    };

    const inputSubmit = (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!message) return

        socket.emit("sendMessage", {message, params});
        console.log(message, params, 'sendMessage');
        setMessage('')
    }

    return (
        <div className={classes.wrap}>
            <div className={classes.header}>
                <div className={classes.title}>
                    room:{params.room}
                </div>
                <div className={classes.activeUsers}>
                    {activeUsers} users in this room
                </div>
                <button className={classes.leave} onClick={leaveRoom}>
                    leave
                </button>
            </div>
            <div className={classes.messages}>
                <Messages messages={messages} userName={searchParams.name}/>
            </div>

            <form
                className={classes.form}
                onSubmit={inputSubmit}
                onClick={() => {document.getElementById('message').focus()}}
            >
                <div className={classes.inputWrapper}>
                    <input
                        autoFocus={true}
                        className={classes.input}
                        placeholder={'Messages...'}
                        value={message}
                        onChange={handleInputChange}
                        id="message"
                        type="text"
                        autoComplete="off"
                        required
                    />
                </div>
                <div className={classes.emoji}>
                    {isOpenEmoji &&
                        <div className={classes.emojiPicker}>
                            <EmojiPicker height={300} width={300} onEmojiClick={onEmojiClick}/>
                        </div>}
                    <img src={moonPNG} alt="emoji" width="24px"
                         onMouseEnter={() => setIsOpenEmoji(true)}
                         onClick={() => setIsOpenEmoji(!isOpenEmoji)}/>
                </div>
                <input
                    className={classes.buttonSubmit}
                    type={"submit"}
                    value={"Send"}
                />
            </form>
        </div>
    )
}