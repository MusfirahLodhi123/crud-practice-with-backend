import React, { useEffect, useState } from "react";
import InputField from "../components/InputField";
import { useNavigate, useParams } from "react-router-dom";

export default function EditStudent() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [errors, setErrors] = useState({});
  const [student, setStudent] = useState({
    firstName: "",
    lastName: "",
    age: "",
    class: "",
    rollNo: "",
    email: "",
    country: "",
    city: "",
    address: "",
    nicNo: "",
    image: null,
  });

  useEffect(() => {
    fetch(`http://localhost:5000/view-students/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setStudent(data);
        console.log(data);
      })
      .catch((err) => console.log("error fetching students :", err.message));
  }, [id]);

  const validateForm = () => {
    let newErrors = {};
    if (!student.firstName) newErrors.firstName = "First Name is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { type, value, name, files } = e.target;
    setStudent((prevData) => ({
      ...prevData,
      [name]: type === "file" ? files[0] : value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const formDataToSend = new FormData();
    for (const key in student) {
      if (key === "image" && typeof student[key] !== "string") {
        formDataToSend.append(key, student[key]); // Append file if it's new
      } else if (key !== "image") {
        formDataToSend.append(key, student[key]); // Append other fields
      }
    }

    try {
      const res = await fetch(`http://localhost:5000/view-students/${id}`, {
        method: "PUT",
        body: formDataToSend,
      });

      const data = await res.json();

      if (!res.ok) {
        setErrors(data.errors || "Something went wrong");
        console.log("Errors:", data.errors);
        return;
      }

      console.log("Student edited successfully");
      navigate("/");
    } catch (err) {
      console.log("Error editing data:", err.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center mt-10">
      <p className="text-3xl font-bold text-center text-fuchsia-950">
        Edit Student
      </p>
      <form
        className="flex flex-col gap-5 mt-5 shadow-2xl p-5"
        onSubmit={handleSubmit}
        encType="multipart/form-data"
      >
        {/* First Name */}
        <InputField
          id="firstName"
          name="firstName"
          label="First Name"
          type="text"
          placeholder="Enter First Name"
          value={student.firstName}
          onChange={handleInputChange}
        />
        <p className="text-red-700">{errors.firstName}</p>

        {/* Last Name */}
        <InputField
          id="lastName"
          name="lastName"
          label="Last Name"
          type="text"
          placeholder="Enter Last Name"
          value={student.lastName}
          onChange={handleInputChange}
        />
        <p className="text-red-700">{errors.lastName}</p>

        {/* Age */}
        <InputField
          id="age"
          name="age"
          label="Age"
          type="number"
          placeholder="Enter Age"
          value={student.age}
          onChange={handleInputChange}
        />
        <p className="text-red-700">{errors.age}</p>

        {/* Class */}
        <InputField
          id="class"
          name="class"
          label="Class"
          type="text"
          placeholder="Enter Class"
          value={student.class}
          onChange={handleInputChange}
        />
        <p className="text-red-700">{errors.class}</p>

        {/* Roll No */}
        <InputField
          id="rollNo"
          name="rollNo"
          label="Roll No"
          type="text"
          placeholder="Enter Roll No"
          value={student.rollNo}
          onChange={handleInputChange}
        />
        <p className="text-red-700">{errors.rollNo}</p>

        {/* Email */}
        <InputField
          id="email"
          name="email"
          label="Email"
          type="email"
          placeholder="Enter Email"
          value={student.email}
          onChange={handleInputChange}
        />
        <p className="text-red-700">{errors.email}</p>

        {/* Country */}
        <InputField
          id="country"
          name="country"
          label="Country"
          type="text"
          placeholder="Enter Country"
          value={student.country}
          onChange={handleInputChange}
        />
        <p className="text-red-700">{errors.country}</p>

        {/* City */}
        <InputField
          id="city"
          name="city"
          label="City"
          type="text"
          placeholder="Enter City"
          value={student.city}
          onChange={handleInputChange}
        />
        <p className="text-red-700">{errors.city}</p>

        {/* Address */}
        <InputField
          id="address"
          name="address"
          label="Address"
          type="textarea"
          placeholder="Enter Address"
          value={student.address}
          onChange={handleInputChange}
        />
        <p className="text-red-700">{errors.address}</p>

        {/* Image */}
        {student.image && (
          <img
            src={`${student.image}`}
            alt="Student"
            className="w-32 h-32 object-cover"
          />
        )}

        <InputField
          id="image"
          label="Image"
          type="file"
          placeholder="Upload Image"
          name="image"
          onChange={handleInputChange}
        />
        <p className="text-red-700">{errors.image}</p>

        {/* NIC No */}
        <InputField
          id="nicNo"
          name="nicNo"
          label="Nic No"
          type="text"
          placeholder="Enter Nic No"
          value={student.nicNo}
          onChange={handleInputChange}
        />
        <p className="text-red-700">{errors.nicNo}</p>

        {/* Actions */}
        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-fuchsia-950 text-white p-2 rounded hover:bg-fuchsia-900"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
