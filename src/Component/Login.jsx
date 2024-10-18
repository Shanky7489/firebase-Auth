import { useState } from "react";
import { app } from "../Firebase";
import {
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const SubmitHandler = (e) => {
    e.preventDefault();
    const auth = getAuth(app);
    signInWithEmailAndPassword(auth, email, password)
      .then((userData) => {
        console.log(userData.user);
        navigate("/dashboard");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const loginWithGoogle = () => {
    const auth = getAuth(app);
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        console.log(result);
        navigate("/dashboard");
      })
      .catch((error) => {
        console.log("error while log in with google", error);
      });
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
            <h2 className="text-2xl font-bold text-center mb-6">Log In</h2>
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
                className="w-full bg-blue-500 text-white py-3 rounded-md hover:bg-blue-600 transition duration-200 font-bold"
              >
                Login
              </button>
            </div>
            <hr />
            <div className="text-center">
              <button
                type="button"
                className="w-full bg-blue-500 text-white py-3 rounded-md hover:bg-blue-600 transition duration-200 font-bold flex items-center justify-center gap-x-3"
                onClick={loginWithGoogle}
              >
                <FcGoogle className="text-center " />
                <p>Login with Google</p>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
