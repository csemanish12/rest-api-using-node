const fs = require('fs');
const jwt = require('jsonwebtoken');
const path = require('path');
const bcrypt = require('bcryptjs');
const {v4: uuidv4} = require('uuid');
const userFilePath = path.resolve(__dirname, '../../data/users.json');

const SECRET_KEY = 'your_secret_key';

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

exports.loginUser = async (req, res) => {
    const { username, password } = req.body;
    const users = readUsers();

    const user = users.find((u) => u.username === username);

    if (user && (await bcrypt.compare(password, user.password))) {
        const token = jwt.sign({id: user.id}, SECRET_KEY, {expiresIn: '1h'});
        res.json({access_token: token});

    } else {
        res.status(401).json({error: 'Invalid credentials'});
    }
};