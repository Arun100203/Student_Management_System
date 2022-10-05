const express = require("express");
const router = express.Router();
const studentcontroller = require("../controllers/studentscontroller");

//view all records
router.get("/",studentcontroller.view);

//post new records
router.get("/adduser",studentcontroller.adduser);
router.post("/adduser",studentcontroller.save);

//update records
router.get("/edituser/:id",studentcontroller.edituser);
router.post("/edituser/:id",studentcontroller.edit);

//delete user
router.get("/deleteuser/:id",studentcontroller.delete);


module.exports=router;

