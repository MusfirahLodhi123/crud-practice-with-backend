import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import InputField from "../components/InputField";

export const AddStudent = () => {
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});

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

  const validateForm = () => {
    let newErrors = {};
    if (!formData.firstName) newErrors.firstName = "First Name is required";
    if (!formData.age) newErrors.age = "Age is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, type, value, files } = e.target;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: type === "file" ? files[0] : value,
    }));

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    const formDataToSend = new FormData();
    for (const key in formData) {
      formDataToSend.append(key, formData[key]);
    }

    try {
      const response = await fetch("http://localhost:5000/add-student", {
        method: "POST",
        body: formDataToSend,
      });
      const data = await response.json();
      if (!response.ok) {
        setErrors(data.errors);
        console.log(data.errors)
        return
      }
      console.log("student added:", data);
      setFormData(initialFormData);
      navigate("/");
    } catch (err) {
      console.log("error adding student");
      alert("failed to add student");
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
        {errors.firstName && <p className="text-red-500">{errors.firstName}</p>}

        <InputField
          id="lastName"
          name="lastName"
          label="Last Name"
          type="text"
          placeholder="Enter Last Name"
          onChange={handleInputChange}
        />
        {errors.lastName && <p className="text-red-500">{errors.lastName}</p>}

        <InputField
          id="age"
          name="age"
          label="Age"
          type="number"
          placeholder="Enter Age"
          onChange={handleInputChange}
        />
        {errors.age && <p className="text-red-500">{errors.age}</p>}

        <InputField
          id="class"
          name="class"
          label="Class"
          type="text"
          placeholder="Enter Class"
          onChange={handleInputChange}
        />
        {errors.class && <p className="text-red-500">{errors.class}</p>}

        <InputField
          id="rollNo"
          name="rollNo"
          label="Roll No"
          type="text"
          placeholder="Enter Roll No"
          onChange={handleInputChange}
        />
        {errors.rollNo && <p className="text-red-500">{errors.rollNo}</p>}

        <InputField
          id="email"
          name="email"
          label="Email"
          type="email"
          placeholder="Enter Email"
          onChange={handleInputChange}
        />
        {errors.email && <p className="text-red-500">{errors.email}</p>}

        <InputField
          id="country"
          name="country"
          label="Country"
          type="text"
          placeholder="Enter Country"
          onChange={handleInputChange}
        />
        {errors.country && <p className="text-red-500">{errors.country}</p>}

        <InputField
          id="city"
          name="city"
          label="City"
          type="text"
          placeholder="Enter City"
          onChange={handleInputChange}
        />
        {errors.city && <p className="text-red-500">{errors.city}</p>}

        <InputField
          id="address"
          name="address"
          label="Address"
          type="textarea"
          placeholder="Enter Address"
          onChange={handleInputChange}
        />
        {errors.address && <p className="text-red-500">{errors.address}</p>}

        <InputField
          id="image"
          name="image"
          label="Image"
          type="file"
          placeholder="Upload Image"
          onChange={handleInputChange}
        />
        {errors.image && <p className="text-red-500">{errors.image}</p>}

        <InputField
          id="nicNo"
          name="nicNo"
          label="Nic No"
          type="text"
          placeholder="Enter Nic No"
          onChange={handleInputChange}
        />
        {errors.nicNo && <p className="text-red-500">{errors.nicNo}</p>}

        {/* Actions */}
        <div className="flex space-x-4 justify-center">
          <button
            type="submit"
            className="bg-fuchsia-950 text-white p-2 rounded hover:bg-fuchsia-900"
          >
            Submit
          </button>
          <Link
            to={`/`}
            className="bg-gray-800 text-white p-2 rounded hover:bg-gray-600 mr-2"
          >
            Back
          </Link>
        </div>
      </form>
    </div>
  );
};
