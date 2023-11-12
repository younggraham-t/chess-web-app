// const user = require('../models/user');
import { user } from "../models/user";
const userFileAccess = require('../doas/userFileAccess')

let userList: user.User[] = [];
userList = getUserList();


function createUser(userName: string, userPassword: string, userFullName?: string) {
    let newUser = new user.User(userList.length + 1, userName, userPassword, userFullName);
    userList.push(newUser);
    userFileAccess.writeUsers(userList); 
}

function getUser(userId: number) {
    for (var user of userList) {
        if (user.userId == userId) {
            return user;
        }
    }
    return null;
}


function getUserList() {
    // let studentList = []
    if (userList.length == 0) {
        userList = userFileAccess.readUsers();
    }
    return userList;
}



module.exports = {
    getUser,
    getUserList,
    createUser
}
