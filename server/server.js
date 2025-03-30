const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const fs = require("fs");
const multer = require("multer");
const path = require("path");
require("dotenv").config();
const BASE_URL = process.env.BASE_URL;

const app = express();
app.use(express.json());
app.use(cors()); // Enable CORS for cross-origin requests
app.use(express.urlencoded({ extended: true }));
app.use(
  "/student-images",
  express.static(path.join(__dirname, "student-images")) // Serve student images statically
);

app.listen(process.env.PORT, () => {
  console.log(`server running on port : ${process.env.PORT}`);
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("mongodb connected"))
  .catch((err) => console.log("error connecting mongodb:", err));

// Define the Student schema
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

// Create a Student model
const Student = mongoose.model("Student", studentSchema);

const uploadDir = "./student-images";
// Create the upload directory if it doesn't exist
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Configure Multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + "-" + uniqueSuffix + ext);
  },
});

// File filter to allow only certain image types
const fileFilter = (req, file, cb) => {
  const allowedFiles = ["image/jpeg", "image/png", "image/jpg"];
  if (allowedFiles.includes(file.mimetype)) {
    cb(null, true);
  } else {
    req.fileValidationError = "Invalid file type. Only JPEG, PNG, JPG allowed.";
    cb(null, false);
  }
};

const upload = multer({ storage: storage, fileFilter });

// Function to validate student data
const validateStudent = (data, fileError) => {
  const errors = {};

  if ((data.age && isNaN(data.age)) || data.age <= 0)
    errors.age = "Age must be a valid number greater than 0";
  if (data.nicNo && data.nicNo.length < 20)
    errors.nicNo = "NIC must be at least 20 characters long";
  if (fileError) {
    errors.image = fileError;
  }
  return Object.keys(errors).length ? errors : null;
};

// Route to add a new student
app.post("/add-student", upload.single("image"), async (req, res) => {
  try {
    const errors = validateStudent(req.body, req.fileValidationError);
    if (errors) return res.status(400).json({ errors });

    const studentData = { ...req.body };
    if (req.file) {
      studentData.image = `${BASE_URL}/student-images/${req.file.filename}`;
    }

    const newStudent = new Student(studentData);
    await newStudent.save();

    res.json({ message: "Student saved successfully", student: newStudent });
  } catch (error) {
    res.status(500).json({ error: "Error saving student", details: error.message });
  }
});

// Route to get all students
app.get("/view-students", async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Route to get a single student by ID
app.get("/view-students/:id", async (req, res) => {
  console.log("id:", req.params.id);
  try {
    const studentById = await Student.findById(req.params.id);
    if (!studentById) {
      return res.status(404).json({ message: "Student not found" });
    } else {
      res.json(studentById);
      console.log(studentById);
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Route to delete a student
app.delete("/view-students/:id", async (req, res) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);
    if (student && student.image) {
      const filename = student.image.split("/").pop();
      const imgPath = path.join(uploadDir, filename);
      if (fs.existsSync(imgPath)) {
        fs.unlinkSync(imgPath);
      }
    }
    res.json({ message: "Student deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Route to update a student
app.put("/view-students/:id", upload.single("image"), async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    // Delete old image if new image is uploaded
    if (req.file && student.image) {
      const filename = student.image.split("/").pop();
      const imgPath = path.join(uploadDir, filename);
      if (fs.existsSync(imgPath)) {
        fs.unlinkSync(imgPath);
      }
    }

    const errors = validateStudent(req.body, req.fileValidationError);
    if (errors) return res.status(400).json({ errors });

    const updatedData = { ...req.body };
    if (req.file) {
      updatedData.image = `${BASE_URL}/student-images/${req.file.filename}`;
    }

    if (updatedData.age) {
      updatedData.age = isNaN(updatedData.age) ? undefined : Number(updatedData.age);
    }

    const updatedStudent = await Student.findByIdAndUpdate(req.params.id, updatedData, { new: true });

    res.json({
      message: "Student updated successfully",
      student: updatedStudent,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
