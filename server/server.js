const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const app = express();

// Ensure uploads directory exists
const uploadDir = "./uploads";
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static("uploads"));

// Multer Storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + "-" + uniqueSuffix + ext);
  },
});

const upload = multer({ storage });

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("MongoDB Error:", err));

// Student Schema
const studentSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  age: Number,
  class: String,
  rollNo: String,
  email: String,
  country: String,
  city: String,
  address: String,
  image: String,
  nicNo: String,
});

// Student Model
const Student = mongoose.model("Student", studentSchema, "students");

// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// POST - Add Student
app.post("/add-students", upload.single("image"), async (req, res) => {
  try {
    const studentData = { ...req.body };
    if (req.file) {
      studentData.image = req.file.filename;
    }
    const newStudent = new Student(studentData);
    await newStudent.save();
    res.json({ message: "Student added successfully", student: newStudent });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/*
  This route handles form data without files.
   Not compatible when handling files (e.g., images).
  
  app.post("/add-students", async (req, res) => {
    try {
      const studentData = new Student(req.body); 
      await studentData.save();
      res.json({ message: "Student added successfully", student: studentData });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
*/

// GET - All Students
app.get("/students", async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET - Single Student
app.get("/students/:id", async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }
    res.json(student);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT - Update Student
app.put("/students/:id", upload.single("image"), async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) return res.status(404).json({ message: "Student not found" });

    if (req.file && student.image) {
      fs.unlinkSync(path.join(uploadDir, student.image));
    }

    const updatedData = { ...req.body };
    if (req.file) updatedData.image = req.file.filename;

    const updatedStudent = await Student.findByIdAndUpdate(
      req.params.id,
      updatedData,
      { new: true }
    );

    res.json({
      message: "Student updated successfully",
      student: updatedStudent,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE - Remove Student
app.delete("/students/:id", async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) return res.status(404).json({ message: "Student not found" });

    if (student.image) {
      fs.unlinkSync(path.join(uploadDir, student.image)); // Delete image
    }

    await Student.findByIdAndDelete(req.params.id);
    res.json({ message: "Student deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
