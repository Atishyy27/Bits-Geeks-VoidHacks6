require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const routes = require("./routes");
const handle = require("./handlers");
const app = express();
const port = process.env.PORT || 4000;

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
app.use(bodyParser.json());

app.get("/", (req, res) => res.json({ hello: "World" }));
if (routes.auth) app.use("/api/auth", routes.auth);
if (routes.internship) app.use("/api/internships", routes.internship);
if (routes.admin) app.use("/api/admin", routes.admin);
if (routes.notices) app.use("/api/notices", routes.notices);
if (routes.faculty) app.use("/api/faculty", routes.faculty);
app.use((req, res, next) => {
    let err = new Error("Not Found");
    err.status = 404;
    next(err);
});
app.use((err, req, res, next) => {
    res.status(err.status || 500).json({
        error: {
            message: err.message || "Something went wrong."
        }
    });
});

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
