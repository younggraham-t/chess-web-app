"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require('fs');
const userFilePath = "src/files/users.json";
function readUsers() {
    let userListBuffer = fs.readFileSync(userFilePath);
    return JSON.parse(userListBuffer.toString());
}
function writeUsers(userList) {
    let JSONString = JSON.stringify(userList);
    fs.writeFileSync(userFilePath, JSONString);
}
module.exports = {
    readUsers,
    writeUsers
};
