const router = require("express").Router();
const handle = require("../handlers");

router.route("/").get(handle.showProfile);
router.route("/all").get(handle.findAll);
router.route("/allStudents").get(handle.findAllStudents);
router.route("/findStudents").get(handle.SomeStudents);
router.route("/deletestudent").put(handle.deletestudent);
router.route("/update/:id").put(handle.updateProfile);
router.route("/add").post(handle.addFaculty);
router.route("/find/:user")
  .get(handle.findFaculty)
  .delete(handle.deleteFaculty);
router.route("/reset/:id").put(handle.resetPassword);
router.post("/login_admin", handle.login_admin);

module.exports = router;
