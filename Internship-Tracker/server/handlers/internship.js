const { Internship, Student, Faculty } = require("../models");
const chain = require("./chain");
let nodemailer = require("nodemailer");
let transport = require("nodemailer-smtp-transport");
require("dotenv").config();

// Email configuration
const options = {
    service: "gmail",
    auth: {
        user: process.env.EMAILFROM || 'test@example.com',
        pass: process.env.PASSWORD || 'password'
    },
    tls: { rejectUnauthorized: false }
};
const client = nodemailer.createTransport(transport(options));

exports.addNewInternship = async (req, res, next) => {
    try {
        const { id } = req.decoded;
        const { application, files } = req.body;

        const student = await Student.findOne({ id });
        if (!student) {
            throw new Error('Student not found');
        }

        const internship = await Internship.create({
            student: {
                id,
                name: student.name,
                currentClass: student.currentClass,
                prevSemAttendance: student.prevSemAttendance,
                rollNo: student.rollNo,
                emailId: student.emailId
            },
            application,
            files,
            createdAt: new Date()
        });

        // Send email notifications
        const emailData = {
            from: process.env.EMAILFROM,
            to: student.emailId,
            subject: "New Internship Application Created",
            html: `Application created for ${application.workplace}`
        };

        client.sendMail(emailData, (err, info) => {
            if (err) console.error('Email error:', err);
        });

        res.status(201).json(internship);
    } catch (err) {
        next({ status: 400, message: err.message });
    }
};

exports.showInternships = async (req, res, next) => {
    try {
        const internships = await Internship.find();
        res.status(200).json(internships);
    } catch (err) {
        next({ status: 400, message: err.message });
    }
};

exports.showApprovedInternships = async (req, res, next) => {
    try {
        const internships = await Internship.find();
        const approved = internships.filter(i => i.docs?.ApplicationStatus === "Approved");
        res.status(200).json(approved);
    } catch (err) {
        next({ status: 400, message: err.message });
    }
};

exports.getInternship = async (req, res, next) => {
    try {
        const { id } = req.params;
        const internship = await Internship.find(i => i._id === id);
        if (!internship) {
            throw new Error("No internship found");
        }
        res.status(200).json(internship);
    } catch (err) {
        next({ status: 400, message: err.message });
    }
};

exports.updateInternship = async (req, res, next) => {
    try {
        const { _id, ...updates } = req.body;
        const internship = await Internship.find(i => i._id === _id);
        if (!internship) {
            throw new Error("Internship not found");
        }
        
        Object.assign(internship, updates);
        internship.comments = "\nApplication status changed! Please check.";
        
        res.status(200).json(internship);
    } catch (err) {
        next({ status: 400, message: "Could not update" });
    }
};

exports.approveInternship = async (req, res, next) => {
    try {
        const { _id, remark } = req.body;
        const internship = await Internship.find(i => i._id === _id);
        if (!internship) {
            throw new Error("Internship not found");
        }

        internship.completionStatus = "Approved";
        internship.comments = `Approved with remark: ${remark}`;

        // Send email notification
        const emailData = {
            from: process.env.EMAILFROM,
            to: internship.student.emailId,
            subject: "Internship Application Approved",
            html: `Your application for ${internship.application.workplace} has been approved`
        };

        client.sendMail(emailData, (err, info) => {
            if (err) console.error('Email error:', err);
        });

        res.status(200).json(internship);
    } catch (err) {
        next({ status: 400, message: "Could not approve" });
    }
};

// Add other handlers with similar mock implementations...

exports.getStats = async (req, res, next) => {
    try {
        // Return mock statistics
        const mockStats = {
            top5workplaces: [],
            datewiseStatusDistribution: [],
            yearwiseDistribution: [],
            classwiseDistribution: [],
            totalMonthwise: []
        };
        res.status(200).json(mockStats);
    } catch (err) {
        next({ status: 400, message: err.message });
    }
};
