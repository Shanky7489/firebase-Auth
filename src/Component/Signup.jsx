import { useState } from "react";
import { app } from "../Firebase";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const SubmitHandler = (e) => {
    e.preventDefault();
    const auth = getAuth(app);
    createUserWithEmailAndPassword(auth, email, password)
      .then((res) => {
        navigate("/login");
        console.log(res);
      })
      .catch((err) => console.log(err));
    console.log("ok done");
  };
  return (
    <div>
      <div>
        <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
          <div className="flex flex-col items-center justify-center gap-y-4">
            <img
              src="https://hackerkernel.com/front_asset/assets/img/HKLogo.png"
              alt="logo"
              className="text-center"
            />
            <h2 className="text-2xl font-bold text-center mb-6">SignUp</h2>
          </div>

          <form onSubmit={SubmitHandler} className="space-y-4">
            {/* Name */}
            <div>
              <label className="block mb-1 text-sm font-semibold">Email</label>
              <input
                type="text"
                placeholder="E-Mail"
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              />
            </div>

            {/* Phone Number */}
            <div>
              <label className="block mb-1 text-sm font-semibold">
                Password
              </label>
              <input
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={5} // Minimum length of 5 digits
                maxLength={10} // Maximum length of 10 digits
                pattern="\d{5,10}"
                placeholder="Password"
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              />
              <small className="text-gray-500">Enter your password</small>
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
    </div>
  );
};

export default Signup;
