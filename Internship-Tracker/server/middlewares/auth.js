const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    if (req.headers.authorization) {
        const token = req.headers.authorization.split(' ')[1];
        jwt.verify(token, process.env.SECRET || 'your-secret-key', (err, decoded) => {
            if (err) {
                next({ status: 401, message: 'Failed to authenticate token' });
            } else {
                req.decoded = decoded;
                next();
            }
        });
    } else {
        next({ status: 401, message: 'No token provided' });
    }
};