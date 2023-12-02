"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const userServices = require('../services/userServices');
function getUserListAPI(req, res) {
    res.json(userServices.getUserList());
}
function getUserAPI(req, res) {
    const userId = parseInt(req.params.id);
    const user = userServices.getUser(userId);
    if (user && user != null) {
        res.json(user);
    }
    else {
        res.status(404).json({ message: 'User not found' });
    }
}
function createUserAPI(req, res) {
    const userData = req.body;
    const newUser = userServices.createUser(userData.userName, userData.userPassword, userData.userRole, userData.userFullName, userData.userBirthDate);
    res.json(newUser);
}
function updateUserAPI(req, res) {
    const userData = req.body;
    const user = userServices.updateUser(req.params.id, userData.userName, userData.userPassword, userData.userRole, userData.userFullName, userData.userBirthDate);
    if (user && user != null) {
        res.json(user);
    }
    else {
        res.status(404).json({ message: 'User not found' });
    }
}
function deleteUserAPI(req, res) {
    const deletedUser = userServices.deleteUser(req.params.id);
    if (deletedUser && deletedUser != null) {
        res.json(deletedUser);
    }
    else {
        res.status(404).json({ message: 'User not found' });
    }
}
module.exports = {
    getUserListAPI,
    getUserAPI,
    createUserAPI,
    updateUserAPI,
    deleteUserAPI
};
