const nodemailer = require("nodemailer");
const transport = require("nodemailer-smtp-transport");
require("dotenv").config();

// Mock data
const users = {
  faculty: [
    {
      id: "1",
      username: "faculty1",
      emailId: "faculty@test.com",
      password: "test123",
      designation: "Professor",
    },
  ],
  admin: [
    {
      id: "1",
      username: "admin",
      emailId: "admin@test.com",
      password: "admin123",
    },
  ],
};

// Mailing options and transporter
const options = {
  service: "gmail",
  auth: {
    user: process.env.EMAILFROM,
    pass: process.env.PASSWORD,
  },
  tls: {
    rejectUnauthorized: false,
  },
};
const client = nodemailer.createTransport(transport(options));

exports.register_faculty = async (req, res, next) => {
  try {
    // Mock faculty registration
    const { username, emailId, password } = req.body;
    const newFaculty = { id: Date.now().toString(), username, emailId, password, designation: "Faculty" };
    users.faculty.push(newFaculty);
    res.status(201).json(newFaculty);
  } catch (err) {
    next(err);
  }
};

exports.login_faculty = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const faculty = users.faculty.find(f => f.username === username);
    if (faculty && faculty.password === password) {
      res.json({ id: faculty.id, username: faculty.username });
    } else {
      throw new Error("Invalid username/password");
    }
  } catch (err) {
    next(err);
  }
};

exports.login_admin = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const admin = users.admin.find(a => a.username === username);
    if (admin && admin.password === password) {
      res.json({ id: admin.id, username: admin.username });
    } else {
      throw new Error("Invalid username/password");
    }
  } catch (err) {
    next(err);
  }
};

exports.addFaculty = async (req, res, next) => {
  try {
    const { username, emailId, password } = req.body;
    const newFaculty = { id: Date.now().toString(), username, emailId, password, designation: "Faculty" };
    users.faculty.push(newFaculty);
    res.status(200).json(newFaculty);
  } catch (err) {
    next(err);
  }
};

exports.findFaculty = async (req, res, next) => {
  try {
    const { user } = req.params;
    const faculty = users.faculty.find(f => f.username === user);
    if (!faculty) {
      throw new Error("Faculty not found");
    }
    return res.status(200).json(faculty);
  } catch (error) {
    next({ status: 400, message: error.message });
  }
};

exports.findAll = async (req, res, next) => {
  try {
    const faculties = users.faculty;
    res.status(200).json(faculties);
  } catch (err) {
    next({ status: 400, message: err.message });
  }
};

exports.deleteFaculty = async (req, res, next) => {
  try {
    const { user } = req.params;
    const facultyIndex = users.faculty.findIndex(f => f.username === user);
    if (facultyIndex === -1) throw new Error("Faculty not found");
    users.faculty.splice(facultyIndex, 1); // Remove faculty from mock data
    return res.status(200).json("Faculty deleted");
  } catch (error) {
    next({ status: 400, message: error.message });
  }
};

exports.showProfile = async (req, res, next) => {
  try {
    const adminProfile = users.admin.find(admin => admin.username === req.body.username);
    if (!adminProfile) {
      return next({ status: 404, message: 'Admin not found' });
    }
    res.status(200).json(adminProfile);
  } catch (error) {
    console.error("Error fetching profile:", error);
    next({ status: 400, message: error.message });
  }
};

exports.updateProfile = async (req, res, next) => {
  try {
    const { id } = req.params;
    const admin = users.admin.find(a => a.id === id);
    if (!admin) throw new Error("Admin not found");
    
    // Update admin profile with mock data
    Object.assign(admin, req.body);
    res.status(200).json(admin);
  } catch (error) {
    next({ status: 400, message: error.message });
  }
};

exports.resetPassword = async (req, res, next) => {
  const { oldpassword, newpassword } = req.body;
  const { id } = req.params;
  try {
    const admin = users.admin.find(a => a.id === id);
    if (admin && admin.password === oldpassword) {
      admin.password = newpassword; // Update password
      return res.status(200).json(admin);
    } else {
      throw new Error("Old password is wrong!");
    }
  } catch (err) {
    next(err);
  }
};

exports.findAllStudents = async (req, res, next) => {
  try {
    // Mock student data
    const students = [
      { id: "1", name: "Student A", emailId: "studentA@test.com" },
      { id: "2", name: "Student B", emailId: "studentB@test.com" },
    ];
    res.status(200).json(students);
  } catch (err) {
    next({ status: 400, message: err.message });
  }
};

exports.SomeStudents = async (req, res, next) => {
  try {
    const { YEAR, DIV } = req.query;
    // Mock filtering logic
    const students = [
      { id: "1", name: "Student A", currentClass: { year: "3", div: "A" } },
      { id: "2", name: "Student B", currentClass: { year: "3", div: "B" } },
    ].filter(s => s.currentClass.year === YEAR && s.currentClass.div === DIV);
    
    res.status(200).json(students);
  } catch (err) {
    next({ status: 400, message: err.message });
  }
};

exports.deletestudent = async (req, res, next) => {
  try {
    const arr = req.body; // Array of student IDs to delete
    // Mock deletion logic
    const students = [
      { id: "1", name: "Student A" },
      { id: "2", name: "Student B" },
    ];
    const remainingStudents = students.filter(s => !arr.includes(s.id));
    if (remainingStudents.length === students.length) {
      throw new Error("Student not found");
    }
    res.status(200).json("Student deleted");
  } catch (error) {
    next({ status: 400, message: error.message });
  }
};
