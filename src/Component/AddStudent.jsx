import { useState } from "react";
import { getDatabase, set, ref } from "firebase/database";
import { app } from "../Firebase";
import { useNavigate } from "react-router-dom";
import {
  ref as StorageRef,
  getDownloadURL,
  getStorage,
  uploadBytes,
} from "firebase/storage";

const AddStudent = () => {
  const [name, setName] = useState("");
  const [admNo, setadmNo] = useState("");
  const [phone, setPhone] = useState(""); // Initialized as empty string
  const [selectedFile, setSelectedFile] = useState(null);
  console.log("name", name);

  const navigate = useNavigate();

  const fileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  const SubmitHandler = async (e) => {
    e.preventDefault();

    // Check if a file is selected
    if (!selectedFile) {
      console.log("No file selected");
      alert("image not selected");
      return;
    }

    const db = getDatabase(app);

    // Upload image to Firebase Storage
    const storage = getStorage(app);
    const ImgRef = StorageRef(storage, `images/${admNo}`);
    await uploadBytes(ImgRef, selectedFile);

    // Get the download URL for the uploaded image
    const ImgURL = await getDownloadURL(ImgRef);

    try {
      // Save student data in Firebase Realtime Database
      await set(ref(db, "student/" + admNo), {
        studentName: name,
        phoneNumber: phone, // Assuming it's stored as string
        imageUrl: ImgURL,
      });

      navigate("/dashboard/studentlist");
    } catch (err) {
      console.log(err, "while saving data in the db");
    }

    console.log("Student data saved successfully");
  };

  return (
    <div>
      {/* <form onSubmit={SubmitHandler}>
        <input
          type="number"
          placeholder="Adm No"
          onChange={(e) => setadmNo(e.target.value)}
          className="border border-gray-500 p-3"
        />
        <input
          type="text"
          placeholder=" Name"
          onChange={(e) => setName(e.target.value)}
          className="border border-gray-500 p-3"
        />
        <input
          type="number"
          placeholder="Student Number"
          onChange={(e) => setPhone(Number(e.target.value))} // Converts input to number
          className="border border-gray-500 p-3"
        />
        <input type="file" onChange={fileChange} />
        <button type="submit">submit</button>
      </form> */}

      <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
        <h2 className="text-2xl font-bold text-center mb-6">Add Student</h2>

        <form onSubmit={SubmitHandler} className="space-y-4">
          {/* Adm No - Disabled */}
          <div>
            <label className="block mb-1 text-sm font-semibold">Adm No</label>
            <input
              type="number"
              placeholder="Adm No"
              onChange={(e) => setadmNo(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md bg-gray-100 "
            />
          </div>

          {/* <div>
            <label className="block mb-1 text-sm font-semibold">Adm No</label>
            <input
              type="number"
              placeholder="Adm No"
              onChange={(e) => setadmNo(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md bg-gray-100 appearance-none"
              min="0"
              step="1"
              onKeyPress={(e) => {
                if (!/[0-9]/.test(e.key)) {
                  e.preventDefault();
                }
              }}
            />
          </div> */}

          {/* Name */}
          <div>
            <label className="block mb-1 text-sm font-semibold">Name</label>
            <input
              type="text"
              placeholder=" Name"
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
              // inputMode="numeric"
              required
              minLength={5} // Minimum length of 5 digits
              maxLength={10} // Maximum length of 10 digits
              pattern="\d{5,10}"
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
              onChange={fileChange}
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
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddStudent;
