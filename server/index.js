const express = require('express');
const PORT = process.env.PORT || 5013;
const http = require('http')
const {Server} = require('socket.io');
const cors = require('cors')
const app = express();
const route = require('./route');

const { currentTime } = require("./until");
const {addUser, findUser, getRoomUsers, removeUser} = require("./users");

app.use(cors({ origin: '*' }));
app.use(route)

const server = http.createServer(app)

const io = new Server(server,{
    cors: {
        origin: "*",
        methods: ["GET", "POST", "PUT", "DELETE"],
    }
});

io.on('connection', (socket) => {
    socket.on('join', ({name, room}) => {
        socket.join(room)

        const {user, isExist} = addUser({ name, room } );

        const userMessage = isExist ? 'here u again' : `hello ${user.name} i am duck`;

        socket.emit('message',{
            data: {
                user : { name:"Admin" },
                time: currentTime(),
                message: userMessage
            }
        })

        socket.broadcast.to(user.room).emit('message', {
            data: {
                user : { name:"Admin" },
                time: currentTime(),
                message: `user ${user.name} joined at room`
            },
        })
        io.to(user.room).emit('usersInRoom', {
            data:{
                users: getRoomUsers(user.room)
            }
        })
    })

    socket.on('sendMessage', ( {message, params} ) => {
        const user = params

        if (user){
            io.to(user.room).emit('message', {data: {
                    user : { name: user.name },
                    time: currentTime(),
                    message: message
                },
            })
        }

        io.to(user.room).emit('usersInRoom', {
            data:{
                users: getRoomUsers(user.room)
            }
        })
    })

    socket.on('leaveRoom',({ params }) =>{
        const user = params
        console.log(user)
        if (user){
            removeUser(user)
            io.to(user.room).emit('message', {
                data: {
                    user : { name:"Admin" },
                    time: currentTime(),
                    message: `${user.name} leaved`
                },
            })
        }
    })

    io.on('disconnect', (socket) => {
        console.log('disconnected');
    })
})


server.listen(PORT, ()=>{
    console.log(`Listening on port ${PORT}`);
})
