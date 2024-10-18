import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  getFirestore,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { app } from "../Firebase";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";

const FacultyList = () => {
  const [faculty, setFaculty] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const db = getFirestore(app);
    const docRef = collection(db, "faculty");
    const docSnap = await getDocs(docRef);
    console.log("row", docSnap);

    const facultyData = docSnap.docs.map((item) => ({
      id: item.id,
      ...item.data(),
    }));
    console.log(facultyData);
    setFaculty(facultyData);
  };

  const DeleteData = async (id) => {
    const db = getFirestore(app);
    const myRef = doc(db, "faculty", id);
    try {
      await deleteDoc(myRef);
      fetchData();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-6 text-center">Faculty List</h1>

        {faculty ? (
          <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {faculty.map((item) => (
              <div
                key={item.id}
                className="bg-white shadow-lg rounded-lg p-6 hover:shadow-2xl transition-shadow duration-300"
              >
                {/* <img
                  src={item.imageUrl}
                  alt={item.studentName}
                  className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
                /> */}
                {/* <h1 className="text-xl font-bold text-center my-2">{key}</h1> */}
                <h2 className="text-xl font-semibold text-center mb-2">
                  name:{item.facultyName}
                </h2>
                <p className="text-center text-gray-600 mb-4">
                  Phone: {item.phoneNumber}
                </p>

                <div className="flex justify-between items-center">
                  <button
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors duration-300"
                    onClick={() => DeleteData(item.id)}
                  >
                    Delete
                  </button>
                  <button
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors duration-300"
                    onClick={() => navigate("/updatefaculty", { state: item })}
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
    </div>
  );
};

export default FacultyList;
