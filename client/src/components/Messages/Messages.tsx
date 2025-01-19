import classes from './Messages.module.scss';
import React from "react";

export interface IMessage {
    user: { name: string }
    message: string,
    time: string
}

interface IMessageProps {
    messages: IMessage[];
    userName: string;
}

export default function Messages({messages, userName}: IMessageProps) {
    return (
        <div className={classes.messages__wrapper}>
            {messages.map((message: IMessage, index: number) => {
                const isMyName = message.user.name.trim().toLowerCase()
                    === userName.trim().toLowerCase()
                const hours = message.time.slice(0,2)
                const minutes = message.time.slice(3)

                return (
                    <div
                        className={`
                        ${classes.message}
                        ${isMyName ? classes.myNameStyle : classes.otherNameStyle}
                        `}
                        key={index}
                    >
                        <span className={classes.text}>{message.message}</span>
                        <span className={classes.time}>{hours}:{minutes}</span>
                        <span className={classes.name}>{message.user.name}</span>
                    </div>
                )

            })}
        </div>
    )
}
