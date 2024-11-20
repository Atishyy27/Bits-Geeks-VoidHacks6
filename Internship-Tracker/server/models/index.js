const { users, internships } = require('../mockData');

// Mock models that mimic MongoDB models' behavior
const Student = {
    create: (data) => {
        const newStudent = {
            id: String(users.students.length + 1),
            ...data
        };
        users.students.push(newStudent);
        return Promise.resolve(newStudent);
    },
    findOne: (query) => {
        const student = users.students.find(s => s.username === query.username);
        return Promise.resolve(student);
    }
};

const Internship = {
    create: (data) => {
        const newInternship = {
            _id: String(internships.length + 1),
            ...data
        };
        internships.push(newInternship);
        return Promise.resolve(newInternship);
    },
    find: () => Promise.resolve(internships)
};

const Notices = {
    create: (data) => Promise.resolve({ id: '1', ...data }),
    find: () => Promise.resolve([])
};

const Faculty = {
    create: (data) => {
        const newFaculty = {
            id: String(users.faculty.length + 1),
            ...data
        };
        users.faculty.push(newFaculty);
        return Promise.resolve(newFaculty);
    },
    findOne: (query) => {
        const faculty = users.faculty.find(f => f.username === query.username);
        return Promise.resolve(faculty);
    }
};

module.exports = {
    Student,
    Internship,
    Notices,
    Faculty
};