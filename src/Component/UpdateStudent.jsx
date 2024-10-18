import { useState } from "react";
import { getDatabase, ref, update } from "firebase/database";
import { app } from "../Firebase";
import { useNavigate, useLocation } from "react-router-dom";
import {
  getStorage,
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";

const UpdateStudent = () => {
  const navigate = useNavigate();
  const location = useLocation();
  console.log("student", location);

  const [name, setName] = useState(location.state[1].studentName);
  const [admNo] = useState(location.state[0]); // Disabled field
  const [phone, setPhone] = useState(location.state[1].phoneNumber);
  const [selectedFile, setSelectedFile] = useState(null); // For handling the file input

  const fileChangeHandler = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  const SubmitHandler = async (e) => {
    e.preventDefault();
    const db = getDatabase(app);
    const studentRef = ref(db, "student/" + location.state[0]);

    // Handle image upload to Firebase Storage
    let imageUrl = location.state[1].imageUrl; // Keep the existing image URL by default
    if (selectedFile) {
      const storage = getStorage(app);
      const fileRef = storageRef(storage, `images/${admNo}`);
      await uploadBytes(fileRef, selectedFile); // Upload the file
      imageUrl = await getDownloadURL(fileRef); // Get the new image URL
    }

    // Update student details in the database
    update(studentRef, { studentName: name, phoneNumber: phone, imageUrl })
      .then(() => {
        navigate("/studentlist");
      })
      .catch((err) => {
        console.log(err, "error while updating data in the db");
      });
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold text-center mb-6">Update Student</h2>

      <form onSubmit={SubmitHandler} className="space-y-4">
        {/* Adm No - Disabled */}
        <div>
          <label className="block mb-1 text-sm font-semibold">Adm No</label>
          <input
            type="number"
            value={admNo}
            disabled
            className="w-full p-3 border border-gray-300 rounded-md bg-gray-100 cursor-not-allowed"
          />
        </div>

        {/* Name */}
        <div>
          <label className="block mb-1 text-sm font-semibold">Name</label>
          <input
            type="text"
            placeholder="Student Name"
            value={name}
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
            type="tel"
            inputMode="numeric"
            pattern="[0-9]{10}"
            maxLength={10}
            required
            placeholder="Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          />
          <small className="text-gray-500">
            Enter a 10-digit phone number.
          </small>
        </div>

        {/* File Input */}
        <div>
          <label className="block mb-1 text-sm font-semibold">
            Upload Profile Image
          </label>
          <input
            type="file"
            onChange={fileChangeHandler}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          />
          <small className="text-gray-500">
            Optional: Upload a new profile image.
          </small>
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-3 rounded-md hover:bg-blue-600 transition duration-200"
          >
            Update
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateStudent;
