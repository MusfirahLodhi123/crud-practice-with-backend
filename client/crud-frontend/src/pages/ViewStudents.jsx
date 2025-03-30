import { Link } from "react-router-dom";
import Modal from "../components/Modal";
import { useEffect, useState } from "react";

export const ViewStudents = () => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [studentsData, setStudentsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedStudentId, setSelectedStudentId] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/view-students")
      .then((res) => res.json())
      .then((data) => {
        setStudentsData(data);
        setLoading(false);
      })
      .catch((err) => console.log("error fetching data:", err.message));
  }, []);

  const handleDelete = () => {
    fetch(`http://localhost:5000/view-students/${selectedStudentId}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then(() => {
        setStudentsData((prevData) => {
         return prevData.filter((student) => student._id !== selectedStudentId);
        });
        setIsDeleteModalOpen(false);
      });
  };

  return (
    <>
      <div className="flex flex-col gap-5 items-center justify-center mt-10">
        <p className="text-3xl font-bold text-center text-fuchsia-950">
          View Students
        </p>

        <div>
          <div className="flex justify-end w-full mb-4">
            <Link
              to={"/add-students"}
              className="flex justify-end bg-fuchsia-950 text-white p-2 rounded hover:bg-fuchsia-900"
            >
              Add Student
            </Link>
          </div>
          {loading ? (
            <p className="text-center text-gray-500">Loading...</p>
          ) : (
            <table className="border border-gray-300 bg-white shadow-md text-center max-w-[20rem] overflow-x-auto">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border border-gray-300 p-2">First Name</th>
                  <th className="border border-gray-300 p-2">Last Name</th>
                  <th className="border border-gray-300 p-2">Age</th>
                  <th className="border border-gray-300 p-2">Class</th>
                  <th className="border border-gray-300 p-2">Roll No</th>
                  <th className="border border-gray-300 p-2">Email</th>
                  <th className="border border-gray-300 p-2">Country</th>
                  <th className="border border-gray-300 p-2">City</th>
                  <th className="border border-gray-300 p-2">Address</th>
                  <th className="border border-gray-300 p-2">Nic No</th>
                  <th className="border border-gray-300 p-2">Image</th>
                  <th className="border border-gray-300 p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {studentsData.map((e) => {
                  return (
                    <tr className="hover:bg-gray-100" key={e._id}>
                      <td className="border border-gray-300 p-2 hover:bg-purple-50">
                        {e.firstName}
                      </td>
                      <td className="border border-gray-300 p-2 hover:bg-purple-50">
                        {e.lastName}
                      </td>
                      <td className="border border-gray-300 p-2 hover:bg-purple-50">
                        {e.age}
                      </td>
                      <td className="border border-gray-300 p-2 hover:bg-purple-50">
                        {e.class}
                      </td>
                      <td className="border border-gray-300 p-2 hover:bg-purple-50">
                        {e.rollNo}
                      </td>
                      <td className="border border-gray-300 p-2 hover:bg-purple-50">
                        {e.email}
                      </td>
                      <td className="border border-gray-300 p-2 hover:bg-purple-50">
                        {e.country}
                      </td>
                      <td className="border border-gray-300 p-2 hover:bg-purple-50">
                        {e.city}
                      </td>
                      <td className="border border-gray-300 p-2 hover:bg-purple-50">
                        {e.address}
                      </td>
                      <td className="border border-gray-300 p-2 hover:bg-purple-50">
                        {e.nicNo}
                      </td>
                      <td className="border border-gray-300 p-2 hover:bg-purple-50">
                        <img
                          src={e.image}
                          alt=""
                          className="w-full h-full object-cover"
                        />
                      </td>
                      <td className="border border-gray-300 p-2 hover:bg-purple-50">
                        <div className="flex items-center gap-2">
                          <Link
                            to={`/edit-student/${e._id}`}
                            className="bg-fuchsia-950 text-white p-2 rounded hover:bg-fuchsia-900 mr-2"
                          >
                            Edit
                          </Link>
                          <button
                            onClick={() => {
                              setSelectedStudentId(e._id);
                              setIsDeleteModalOpen(true);
                            }}
                            className="bg-red-500 text-white p-2 rounded hover:bg-red-700"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}

          <Modal
            isOpen={isDeleteModalOpen}
            onClose={() => setIsDeleteModalOpen(false)}
            onConfirm={handleDelete}
            title="Delete Student"
          >
            <p>Are you sure you want to delete this student?</p>
          </Modal>
        </div>
      </div>
    </>
  );
};
