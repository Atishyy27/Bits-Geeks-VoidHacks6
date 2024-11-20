const jwt = require('jsonwebtoken');
const { users } = require('../mockData');

exports.register = async (req, res, next) => {
    try {
        const { username, password, emailId } = req.body;

        if (!username || !password || !emailId) {
            throw new Error('All fields are required');
        }

        // Check if username already exists
        const exists = users.students.some(s => s.username === username);
        if (exists) {
            throw new Error('Username already taken');
        }

        // Create new student (in real app, would save to database)
        const newStudent = {
            id: Date.now().toString(),
            username,
            password,
            emailId,
            role: 'student',
            name: {
                firstname: '',
                lastname: ''
            }
        };

        users.students.push(newStudent);

        // Generate token
        const token = jwt.sign(
            { 
                id: newStudent.id, 
                username: newStudent.username,
                role: newStudent.role 
            },
            process.env.SECRET || 'your-secret-key'
        );

        return res.status(201).json({
            token,
            ...newStudent
        });
    } catch (err) {
        return next({
            status: 400,
            message: err.message
        });
    }
};

exports.login = async (req, res, next) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            throw new Error('All fields are required');
        }

        // Try to find user in all categories
        let user = users.students.find(s => s.username === username) ||
                  users.faculty.find(f => f.username === username) ||
                  users.admin.find(a => a.username === username);

        if (!user) {
            throw new Error('Invalid username/password');
        }

        // Check password
        if (password !== user.password) {
            throw new Error('Invalid username/password');
        }

        // Generate token
        const token = jwt.sign(
            { 
                id: user.id, 
                username: user.username,
                role: user.role 
            },
            process.env.SECRET || 'your-secret-key'
        );

        // Return user data and token
        return res.json({
            token,
            username: user.username,
            role: user.role,
            id: user.id,
            emailId: user.emailId,
            name: user.name
        });
    } catch (err) {
        return next({
            status: 400,
            message: err.message
        });
    }
};

exports.login_faculty = async (req, res, next) => {
    try {
        const { username, password } = req.body;

        const faculty = users.faculty.find(f => 
            f.username === username && f.password === password
        );

        if (!faculty) {
            throw new Error('Invalid Username/Password');
        }

        const token = jwt.sign(
            { id: faculty.id, username: faculty.username },
            process.env.SECRET || 'your-secret-key'
        );

        return res.json({
            id: faculty.id,
            username: faculty.username,
            token
        });
    } catch (err) {
        next({
            status: 400,
            message: err.message
        });
    }
};

exports.login_admin = async (req, res, next) => {
    try {
        const { username, password } = req.body;

        const admin = users.admin.find(a => 
            a.username === username && a.password === password
        );

        if (!admin) {
            throw new Error('Invalid Username/Password');
        }

        const token = jwt.sign(
            { id: admin.id, username: admin.username },
            process.env.SECRET || 'your-secret-key'
        );

        return res.json({
            id: admin.id,
            username: admin.username,
            token
        });
    } catch (err) {
        next({
            status: 400,
            message: err.message
        });
    }
};

// Add other necessary exports
exports.updateStudent = (req, res, next) => {
    // Mock implementation
    res.json({ message: 'Update successful' });
};

exports.getStudentDetails = (req, res, next) => {
    // Mock implementation
    res.json({ message: 'Student details retrieved' });
};

exports.resetStudentPassword = (req, res, next) => {
    // Mock implementation
    res.json({ message: 'Password reset successful' });
};

exports.forgotPassword = (req, res, next) => {
    // Mock implementation
    res.json({ message: 'Password reset email sent' });
};
