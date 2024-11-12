const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');
const {v4: uuidv4} = require('uuid');
const userFilePath = path.resolve(__dirname, '../../data/users.json');

const writeUsers = (users) => {
    fs.writeFileSync(userFilePath, JSON.stringify(users, null, 2));
};

const readUsers = () => {
    const data = fs.readFileSync(userFilePath, 'utf8');
    return JSON.parse(data || '[]');
};

exports.registerUser = async (req, res) => {
    const { username, password } = req.body;
    const users = readUsers();

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = { id: uuidv4(), username: username, password: hashedPassword };
    users.push(newUser);
    writeUsers(users);

    res.status(201).json({message: 'User registered'});
};