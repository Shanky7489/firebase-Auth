import { doc, getFirestore, updateDoc } from "firebase/firestore";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { app } from "../Firebase";

const UpdateFaculty = () => {
  const location = useLocation();
  const navigate = useNavigate();
  console.log(location);
  const [name, setName] = useState(location.state.facultyName);
  const [phone, setPhone] = useState(location.state.phoneNumber);

  const SubmitHandler = async (e) => {
    e.preventDefault();
    const db = getFirestore(app);
    const myRef = doc(db, "faculty", location.state.id);
    try {
      await updateDoc(myRef, { facultyName: name, phoneNumber: phone });
      navigate("/facultylist");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
        <h2 className="text-2xl font-bold text-center mb-6">Update Faculty</h2>

        <form className="space-y-4" onSubmit={SubmitHandler}>
          {/* Name */}
          <div>
            <label className="block mb-1 text-sm font-semibold">Name</label>
            <input
              type="text"
              placeholder=" Name"
              //   onChange={(e) => setName(e.target.value)}
              onChange={(e) => setName(e.target.value)}
              value={name}
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
              onChange={(e) => setPhone(e.target.value)}
              value={phone}
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

export default UpdateFaculty;
