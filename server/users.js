const { trimString } = require("./until");

let users = [];

const findUser = (user) => {
    const userName = trimString(user.name);
    const userRoom = trimString(user.room);

    return users.find(
        (user) => (trimString(user.name) === userName) && (trimString(user.room) === userRoom)
    );
}


const addUser = (user) => {
    const isExist = findUser(user);

    !isExist && users.push(user);
    const currentUser = isExist || user

    return {isExist: !!isExist, user: currentUser}
}

const getRoomUsers = (room) => users.filter( (u) => u.room === room )

const removeUser = (user) => {
    const foundUser = findUser(user);
    if (foundUser) {
        users = users.filter( ({ name, room }) => foundUser.room === room && foundUser.name !== name);
    }

}

module.exports = { addUser, findUser, getRoomUsers, removeUser }