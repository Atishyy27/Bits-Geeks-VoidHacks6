const internships = [
    {
        _id: "1",
        application: {
            workplace: "Company A",
            submittedDate: "2023-01-01",
            offerLetter: "link_to_offer_letter",
            durationOfInternship: "3 months",
        },
        docs: {
            ApplicationStatus: "Approved",
            UndertakingStatus: "Pending",
            OfferLetterStatus: "Approved",
            MarksheetsStatus: "Pending",
            AttendanceStatus: "Approved",
        },
        student: {
            name: {
                firstname: "John",
                lastname: "Doe",
            },
            currentClass: {
                year: 3,
                div: "A",
            },
            rollNo: "C2K123456",
            prevSemAttendance: 90,
        },
        holder: {
            id: "admin1",
            designation: "Admin",
        },
        completionStatus: "Pending",
        comments: "Looking good.",
    }
];

const users = {
    students: [
        {
            id: "1",
            username: "C2K12345678",
            password: "test123",
            emailId: "student@test.com",
            role: "student",
            name: {
                firstname: "Test",
                lastname: "Student"
            },
            currentClass: {
                year: "TE",
                div: "2"
            },
            rollNo: "31241",
            prevSemAttendance: "75.5"
        }
    ],
    faculty: [
        {
            id: "2",
            username: "faculty1",
            password: "test123",
            emailId: "faculty@test.com",
            role: "faculty",
            name: {
                firstname: "Test",
                lastname: "Faculty"
            },
            department: "Computer",
            designation: "Professor"
        }
    ],
    admin: [
        {
            id: "3",
            username: "admin",
            password: "admin123",
            emailId: "admin@test.com",
            role: "admin",
            name: {
                firstname: "Test",
                lastname: "Admin"
            },
            department: "Computer",
            designation: "Admin"
        }
    ]
};

module.exports = { internships, users };
