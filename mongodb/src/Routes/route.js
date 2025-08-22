import express from "express";
import {
  createStudent,
  getStudent,
  deleteStudent,
  updateStudent,
  getAllStudents,
} from "../controller/postcontoller.js";

const router = express.Router();

router.post("/createstudent", createStudent);
router.get("/getuser/:userid", getStudent);
router.delete("/deletedstudent/:userid", deleteStudent);
router.put("/updateuser/:userid", updateStudent);
router.get("/getallstudents", getAllStudents);
export default router;
