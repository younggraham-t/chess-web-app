const userServices = require('../services/userServices');
import Express from 'express';


function getUserListAPI(req: Express.Request, res: Express.Response) {
    res.json(userServices.getUserList());
}

function getUserAPI(req: Express.Request, res: Express.Response) {
    const userId = parseInt(req.params.id);
    const user = userServices.getUser(userId);
    if (user && user != null) {
        res.json(user);
    }
    else {
        res.status(404).json({ message: 'User not found' });
    }
}

function createUserAPI(req: Express.Request, res: Express.Response) {
    const userData = req.body;
    const newUser = userServices.createUser(userData.userName, userData.userPassword, userData.userRole, userData.userFullName, userData.userBirthDate);
    res.json(newUser);
}

function updateUserAPI(req: Express.Request, res: Express.Response) {
    const userData = req.body;
    const user = userServices.updateUser(req.params.id, userData.userName, userData.userPassword, userData.userRole, userData.userFullName, userData.userBirthDate);
    if (user && user != null) {
        res.json(user);
    }
    else {
        res.status(404).json({ message: 'User not found' });
    }
    
}

function deleteUserAPI(req: Express.Request, res: Express.Response) {
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
}
