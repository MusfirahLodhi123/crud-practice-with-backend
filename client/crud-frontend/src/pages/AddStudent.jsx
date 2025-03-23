import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import InputField from "../components/InputField";

export const AddStudent = () => {
  const navigate = useNavigate();

  const initialFormData = {
    firstName: "",
    lastName: "",
    age: "",
    class: "",
    rollNo: "",
    email: "",
    country: "",
    city: "",
    address: "",
    image: null,
    nicNo: "",
  };

  const [formData, setFormData] = useState(initialFormData);

  const handleInputChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // not compatible for file types because we cant send files in  json format
  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const response = await fetch("http://localhost:5000/add-students", {
  //       method: "POST",
  //       headers: {
  //         "content-type": "application/json",
  //       },
  //       body: JSON.stringify(formData),
  //     });

  //     const data = await response.json();
  //     if (!response.ok) {
  //       throw new Error(data.error || "Failed to add student.");
  //     }

  //     console.log("Student added:", data);
  //     alert("Student added successfully!");
  //     setFormData(initialFormData);
  //     navigate("/");
  //   } catch (err) {
  //     console.error("Error adding student:", err);
  //     alert("Failed to add student.");
  //   }
  // };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();

    for (const key in formData) {
      formDataToSend.append(key, formData[key]);
    }

    try {
      const response = await fetch("http://localhost:5000/add-students", {
        method: "POST",
        body: formDataToSend,
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Failed to add student.");
      }
      console.log("student added:", data);
      setFormData(initialFormData);
      navigate("/");
    } catch (err) {
      console.error("Error adding student:", err.message);
      alert("Failed to add student.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center mt-10">
      <p className="text-3xl font-bold text-center text-fuchsia-950">
        Add Student
      </p>
      <form
        className="flex flex-col gap-5 mt-5 shadow-2xl p-5"
        onSubmit={handleSubmit}
        encType="multipart/form-data"
      >
        <InputField
          id="firstName"
          name="firstName"
          label="First Name"
          type="text"
          placeholder="Enter First Name"
          onChange={handleInputChange}
        />

        <InputField
          id="lastName"
          name="lastName"
          label="Last Name"
          type="text"
          placeholder="Enter Last Name"
          onChange={handleInputChange}
        />

        <InputField
          id="age"
          name="age"
          label="Age"
          type="number"
          placeholder="Enter Age"
          onChange={handleInputChange}
        />

        <InputField
          id="class"
          name="class"
          label="Class"
          type="text"
          placeholder="Enter Class"
          onChange={handleInputChange}
        />

        <InputField
          id="rollNo"
          name="rollNo"
          label="Roll No"
          type="text"
          placeholder="Enter Roll No"
          onChange={handleInputChange}
        />

        <InputField
          id="email"
          name="email"
          label="Email"
          type="email"
          placeholder="Enter Email"
          onChange={handleInputChange}
        />

        <InputField
          id="country"
          name="country"
          label="Country"
          type="text"
          placeholder="Enter Country"
          onChange={handleInputChange}
        />

        <InputField
          id="city"
          name="city"
          label="City"
          type="text"
          placeholder="Enter City"
          onChange={handleInputChange}
        />

        <InputField
          id="address"
          name="address"
          label="Address"
          type="textarea"
          placeholder="Enter Address"
          onChange={handleInputChange}
        />

        <InputField
          id="image"
          name="image"
          label="Image"
          type="file"
          placeholder="Upload Image"
          onChange={handleInputChange}
        />

        <InputField
          id="nicNo"
          name="nicNo"
          label="Nic No"
          type="text"
          placeholder="Enter Nic No"
          onChange={handleInputChange}
        />

        {/* Actions */}
        <div className="flex space-x-4 justify-center">
          <button
            type="submit"
            className="bg-fuchsia-950 text-white p-2 rounded hover:bg-fuchsia-900"
          >
            Submit
          </button>
          <button
            onClick={() => setFormData(initialFormData)}
            type="reset"
            className="bg-gray-500 text-white p-2 rounded hover:bg-gray-700"
          >
            Reset
          </button>
        </div>
      </form>
    </div>
  );
};
