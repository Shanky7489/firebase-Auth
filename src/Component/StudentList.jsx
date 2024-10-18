import { getDatabase, onValue, ref, remove } from "firebase/database";
import { useEffect, useState } from "react";
import { app } from "../Firebase";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";
import { deleteObject, getStorage, ref as storageRef } from "firebase/storage";

const StudentList = () => {
  const [studentData, setStudentData] = useState();

  const navigate = useNavigate();

  useEffect(() => {
    const DB = getDatabase(app);
    const studentRef = ref(DB, "student");
    onValue(studentRef, (snapshot) => {
      const data = snapshot.val();
      setStudentData(data);
      console.log("data", data);
    });
  }, []);

  const deleteHandler = (key) => {
    toast.info(
      <div className="text-center">
        <p className="font-semibold mb-2">
          Are you sure you want to delete this student?
        </p>
        <div className="flex justify-center">
          <button
            onClick={() => {
              const DB = getDatabase(app);
              const studentRef = ref(DB, "student/" + key);
              const storageDB = getStorage(app);
              const myRef = storageRef(storageDB, "images/" + key);
              deleteObject(myRef)
                .then(() => {
                  remove(studentRef);
                  toast.dismiss();
                })
                .catch((err) => {
                  console.log(err);
                });
            }}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md mx-2"
          >
            Yes
          </button>
          <button
            onClick={() => toast.dismiss()}
            className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md mx-2"
          >
            No
          </button>
        </div>
      </div>,
      {
        position: "top-center",
        autoClose: false, // Keep toast open until interaction
        closeOnClick: false,
        hideProgressBar: true,
        draggable: false,
      }
    );
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Student List</h1>

      {studentData ? (
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {Object.entries(studentData).map(([key, item]) => (
            <div
              key={key}
              className="bg-white shadow-lg rounded-lg p-6 hover:shadow-2xl transition-shadow duration-300"
            >
              <img
                src={item.imageUrl}
                alt={item.studentName}
                className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
              />
              <h1 className="text-xl font-bold text-center my-2">{key}</h1>
              <h2 className="text-xl font-semibold text-center mb-2">
                {item.studentName}
              </h2>
              <p className="text-center text-gray-600 mb-4">
                Phone: {item.phoneNumber}
              </p>

              <div className="flex justify-between items-center">
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors duration-300"
                  onClick={() => deleteHandler(key)}
                >
                  Delete
                </button>
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors duration-300"
                  onClick={() =>
                    navigate("/updatestudent", { state: [key, item] })
                  }
                >
                  Edit
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">No students found</p>
      )}

      <ToastContainer />
    </div>
  );
};

export default StudentList;
