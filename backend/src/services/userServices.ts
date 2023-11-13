// const user = require('../models/user');
import { user } from "../models/user";
const userFileAccess = require('../doas/userFileAccess')

let userList: user.User[] = [];
userList = getUserList();


function createUser(userName: string, userPassword: string, userRole?: string, userFullName?: string, userBirthDate?: string) {
    for (let user of userList) { //make sure there aren't duplicate usernames
        if (user.userName == userName) {
            return null;
        }
    }
    let newUser = new user.User(userList.length + 1, userName, userPassword, userRole, userFullName, userBirthDate);
    userList.push(newUser);
    userFileAccess.writeUsers(userList); 
    return newUser;
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

function updateUser(userId: number, userName?: string, userPassword?: string, userRole?: string, userFullName?: string, userBirthDate?: string) {
    let editUser = getUser(userId);
    console.log(editUser); 
    if (editUser) {
        if (userName) {
            editUser.userName = userName;
        }
        if (userPassword) {
            editUser.userPassword = userPassword;
        }
        Object.values(user.UserRole).forEach((value) => {
            if (editUser) {
                if (value == userRole) {
                    editUser.userRole = userRole;
                }
            }
        })
        if (userFullName) {
            editUser.userFullName = userFullName;
        }
        if (userBirthDate) {
            editUser.userBirthDate = new Date(userBirthDate);
        }
        userFileAccess.writeUsers(userList);
    }   
}

function deleteUser(userId: number) {
    let index = 0;
    for (let userIter of userList) {
        if (userIter.userId == userId) {
            userList.splice(index,1);
            userFileAccess.writeUsers(userList);
            return userId;
        }
        index++;
    }
    return undefined
}




module.exports = {
    getUser,
    getUserList,
    createUser,
    updateUser,
    deleteUser
}
