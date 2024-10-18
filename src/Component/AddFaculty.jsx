import { useState } from "react";
import {
  collection,
  addDoc,
  getFirestore,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { app } from "../Firebase";
import { useNavigate } from "react-router-dom";

const AddFaculty = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const SubmitHandler = async (e) => {
    e.preventDefault();
    console.log(name, phone);
    const db = getFirestore(app);
    try {
      const facultyCollection = collection(db, "faculty");
      const q = query(
        facultyCollection,
        where("facultyName", "==", name),
        where("phoneNumber", "==", phone)
      );

      const QuerySnapshot = await getDocs(q);
      if (QuerySnapshot.empty) {
        // If no matching document, add a new faculty document
        const docRef = await addDoc(collection(db, "faculty"), {
          facultyName: name,
          phoneNumber: phone,
        });
        console.log("Faculty added with ID: ", docRef.id);
        navigate("/dashboard/facultylist");
      } else {
        console.log("Duplicate faculty found, no document added.");
        alert("Faculty with the same name and phone number already exists.");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
        <h2 className="text-2xl font-bold text-center mb-6">Add Faculty</h2>

        <form onSubmit={SubmitHandler} className="space-y-4">
          {/* Name */}
          <div>
            <label className="block mb-1 text-sm font-semibold">Name</label>
            <input
              type="text"
              placeholder=" Name"
              //   onChange={(e) => setName(e.target.value)}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Phone Number */}
          <div>
            <label className="block mb-1 text-sm font-semibold">
              Phone Number
            </label>
            <input
              type="number"
              required
              minLength={5} // Minimum length of 5 digits
              maxLength={10} // Maximum length of 10 digits
              pattern="\d{5,10}"
              placeholder="Phone Number"
              onChange={(e) => setPhone(e.target.value)}
              //   value={phone}
              //   onChange={(e) => setPhone(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            />
            <small className="text-gray-500">
              Enter a 10-digit phone number.
            </small>
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-3 rounded-md hover:bg-blue-600 transition duration-200"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddFaculty;
