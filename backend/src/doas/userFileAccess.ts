const fs = require('fs');
const userFilePath = "src/files/users.json"
import { user } from "../models/user";

function readUsers() {
    
   let userListBuffer = fs.readFileSync(userFilePath);
   return JSON.parse(userListBuffer.toString());
}
function writeUsers(userList: user.User[]) {
    let JSONString = JSON.stringify(userList);
    fs.writeFileSync(userFilePath,JSONString);
}
 
module.exports = {
    readUsers,
    writeUsers
}
