const {v4: uuidv4}  = require('uuid');
const fs = require('fs');
const path = require('path');

const userFilePath = path.resolve(__dirname, '../../data/users.json');
const JSON_SPACE_INDENTATION = 2;
const logger = require('../utils/logger');

const getUser = () => {
    return JSON.parse(abcd);
};



const readUsers = () => {
    const users = fs.readFileSync(userFilePath, 'utf8');
    return JSON.parse(users || '[]');
};

const writeUser = (users) => {
    fs.writeFileSync(userFilePath, JSON.stringify(users, null, JSON_SPACE_INDENTATION));
};

exports.getAllUsers = (req, res, next) => {
    try {
        const users = readUsers();
        res.json(users);
    } catch (error) {
        logger.error('failed to retrieve users');
        next(error);
    }

};

exports.getUserById = (req, res) => {
    const users = readUsers();
    const user = users.find((u) => u.id === req.params.id);

    if (user) {
        const user_response = {id: user.id, username: user.username}; 
        res.json(user_response);
    } else {
        res.status(404).json({error: 'User not found'});
    }
}