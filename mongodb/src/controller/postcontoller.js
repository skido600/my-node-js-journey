import { studentmodel } from "../model/studentmodel.js";

const stackvalid = [
  "Backend",
  "Frontend",
  "DataAnalysis",
  "UI/UX",
  "Mobiledev",
];

// Create student
const createStudent = async (req, res) => {
  try {
    const { name, email, phoneNumber, stack } = req.body;
    const modifieldName = name?.toLowerCase();
    const modifieldnewemail = email?.toLowerCase();
    const modifieldnewPhoneNumber = phoneNumber?.toLowerCase();
    const modifieldnewstack = stack
      ?.slice(0, 1)
      .toUpperCase()
      .concat(stack?.slice(1));

    if (
      !modifieldName ||
      !modifieldnewemail ||
      !modifieldnewPhoneNumber ||
      !stack
    ) {
      return res.status(400).json({ error: "Missing fields required" });
    }

    if (!stackvalid.includes(modifieldnewstack)) {
      return res.status(400).json({ error: "Invalid stack" });
    }

    const newstudent = new studentmodel({
      name: modifieldName,
      email: modifieldnewemail,
      phoneNumber: modifieldnewPhoneNumber,
      stack: modifieldnewstack,
    });

    await newstudent.save();
    return res.status(201).json({
      message: `student with the name ${name} is created successfully`,
    });
  } catch (error) {
    return res.status(500).json({ message: `internal server error ${error}` });
  }
};

//Get student by ID
const getStudent = async (req, res) => {
  try {
    const userid = req.params.userid;
    if (!userid) return res.status(400).json({ error: "Invalid student id" });

    const finduser = await studentmodel.findById(userid);
    if (!finduser) return res.status(404).json({ error: "student not found" });

    return res
      .status(200)
      .json({ message: "student found successfully", finduser });
  } catch (error) {
    return res.status(500).json({ message: `internal server error ${error}` });
  }
};

// Delete student
const deleteStudent = async (req, res) => {
  try {
    const userid = req.params.userid;
    if (!userid) return res.status(400).json({ error: "Invalid student id" });

    const deleted = await studentmodel.findByIdAndDelete(userid);
    if (!deleted) return res.status(404).json({ error: "student not found" });

    return res.status(200).json({ message: "student deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: `internal server error ${error}` });
  }
};

// Update student stack
const updateStudent = async (req, res) => {
  try {
    const { stack } = req.body;
    const userid = req.params.userid;

    const modifieldnewstack = stack
      .slice(0, 1)
      .toUpperCase()
      .concat(stack?.slice(1));

    if (!stack) return res.status(400).json({ error: "Stack is required" });

    if (!stackvalid.includes(modifieldnewstack)) {
      return res.status(400).json({ error: "Invalid stack" });
    }

    const student = await studentmodel.findById(userid);
    if (!student) return res.status(404).json({ error: "student not found" });

    const modifieduser = await studentmodel.findByIdAndUpdate(
      userid,
      { stack: modifieldnewstack },
      { new: true }
    );

    return res
      .status(200)
      .json({ message: "student updated successfully", modifieduser });
  } catch (error) {
    return res.status(500).json({ message: `internal server error ${error}` });
  }
};
const getAllStudents = async (req, res) => {
  try {
    const students = await studentmodel.find();
    if (students.length === 0) {
      return res.status(404).json({ message: "No students found" });
    }
    return res.status(200).json({
      message: "students retrieved successfully",
      count: students.length,
      students,
    });
  } catch (error) {
    return res.status(500).json({ message: `internal server error ${error}` });
  }
};

export {
  createStudent,
  getStudent,
  deleteStudent,
  updateStudent,
  getAllStudents,
};
