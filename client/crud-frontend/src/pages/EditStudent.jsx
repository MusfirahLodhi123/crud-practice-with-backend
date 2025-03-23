import React, { useEffect, useState } from "react";
import InputField from "../components/InputField";
import { useNavigate, useParams } from "react-router-dom";

export default function EditStudent() {
  const { id } = useParams();
  const navigate = useNavigate();
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
  });
  //get data
  useEffect(() => {
    fetch(`http://localhost:5000/students/${id}`)
      .then((res) => res.json())
      .then((data) => setStudent(data))
      .catch((err) => console.log(err));
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      setStudent({ ...student, [name]: files[0] });
    } else {
      setStudent({ ...student, [name]: value });
    }
  };

  //update data
  const handleSubmit = (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    for (const key in student) {
      formDataToSend.append(key, student[key]);
    }
    try {
      fetch(`http://localhost:5000/students/${id}`, {
        method: "PUT",
        body: formDataToSend,
      })
        .then((res) => res.json())
        .then(() => {
          alert("Student updated successfully!");
          navigate("/");
        });
    } catch (err) {
      console.log("error editing data: ", err);
    }
    // fetch(`http://localhost:5000/students/${id}`, {
    //   method: "PUT",
    //   headers: { "content-type": "application/json" },
    //   body: JSON.stringify(student),
    // })
    //   .then((res) => res.json())
    //   .then(() => {
    //     alert("Student updated successfully!");
    //     navigate("/");
    //   });
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

        {/* Image */}
        {student.image && (
          <img
            src={`http://localhost:5000/uploads/${student.image}`}
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
