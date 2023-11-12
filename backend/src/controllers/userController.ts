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

module.exports = {
    getUserListAPI,
    getUserAPI
}
