const jwt = require('jsonwebtoken');

const SECRET_KEY = 'your_secret_key';

const authMiddleware  = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
        return res.status(401).json({error: 'Unauthorized access'});
    }

    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        req.user = decoded;
        console.log('Decoded Token:', decoded);

        next();
    } catch (error) {
        res.status(401).json({error: 'Invalid token'});
    }
};

module.exports = authMiddleware;