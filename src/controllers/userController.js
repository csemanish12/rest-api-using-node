const {v4: uuidv4}  = require('uuid');
const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');
const { userResponseSchema, userListResponseSchema } = require('../schemas/responseSchema');

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
    console.log('user token:', req.user);
    try {
        const users = readUsers();
        const { error, value } = userListResponseSchema.validate(users, {stripUnknown: true});        
        
        if (error) {
            logger.error('response validation failed:', error.details)
            return res.status(500).json({error: 'Internal server error'});
        }
        
        res.json(value);
    } catch (error) {
        logger.error('failed to retrieve users');
        next(error);
    }

};

exports.getUserById = (req, res) => {
    const users = readUsers();
    const user = users.find((u) => u.id === req.params.id);

    if (user) {
        const userResponse = {id: user.id, username: user.username}; 
        res.json(userResponse);
    } else {
        res.status(404).json({error: 'User not found'});
    }
}

exports.updateUser = async (req, res) => {
    const users = readUsers();
    const userIndex = users.findIndex((u) => u.id === req.params.id);

    if (userIndex === -1) {
        return res.status(404).json({error: 'User not found'});
    }
    hashedPassword = await bcrypt.hash(req.body.password, 10);
    users[userIndex] = {...users[userIndex], ...req.body, password: hashedPassword};
    writeUser(users);
    const userResponse  = {id: users[userIndex].id, username: users[userIndex].username};
    res.json(userResponse);
};

exports.deleteUser = async (req, res) => {
    const users = readUsers();
    const userIndex = users.findIndex((u) => u.id === req.params.id);

    if (userIndex === -1) {
        return res.status(404).json({error: 'User not found'});
    }

    users.splice(userIndex, 1);
    writeUser(users);
    res.status(204).end();

};