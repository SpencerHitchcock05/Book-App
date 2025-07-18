import React, { useState } from "react";
import Nav from "../components/Nav";
import Background from "../components/Background";
import Cursor from "../components/Cursor";
import paths from "../paths";
import axios from "axios";
import { UserContext } from "../context/userContext.jsx"
import { useContext } from "react";

const apiUrl = import.meta.env.VITE_API_URL;

function Login() {
  const { setUser } = useContext(UserContext);
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });

  const toggleMode = () => setIsLogin(!isLogin);
  const toggleShowPassword = () => setShowPassword(!showPassword);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.username || !formData.password) {
      alert("Please fill in all required fields.");
      return;
    }
    if (!isLogin && formData.password !== formData.confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    if (isLogin) {
      console.log("Logging in with", formData);
      const response = await axios.post(`${apiUrl}${paths.Users.Base}${paths.Users.Login}`, {...formData})
      console.log(response.data)
      setUser(...response.data.user)
    } else {
      console.log("Signing up with", formData);
      axios.post(`${apiUrl}${paths.Users.Base}${paths.Users.Register}`, {...formData})
    }
  };

  return (
    <>
        <Nav/>
        <Background/>
        <div className="flex items-center justify-center  p-4">
        <div className="w-full max-w-md bg-light-color rounded-2xl shadow-md p-8">
            <h2 className="text-2xl text-text-color font-semibold mb-6 text-center">
            {isLogin ? "Login" : "Sign Up"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
            <input
                type="text"
                name="username"
                placeholder="Username"
                className="w-full px-4 py-2 text-text-color border border-white rounded-xl focus:outline-none focus:ring focus:ring-blue-200"
                value={formData.email}
                onChange={handleChange}
                required
            />
            <div className="relative">
                <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                className="w-full px-4 py-2 text-text-color border border-white rounded-xl pr-20 focus:outline-none focus:ring focus:ring-blue-200"
                value={formData.password}
                onChange={handleChange}
                required
                />
                <button
                type="button"
                onClick={toggleShowPassword}
                className="absolute right-3 top-2 text-sm text-text-color hover:underline"
                >
                {showPassword ? "Hide" : "Show"}
                </button>
            </div>
            {!isLogin && (
                <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring focus:ring-blue-200"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                />
            )}
            <button
                type="submit"
                className="w-full bg-lighter-color text-white py-2 rounded-xl hover:bg-blue-700 transition"
            >
                {isLogin ? "Login" : "Sign Up"}
            </button>
            </form>
            <p className="text-center text-sm mt-4 text-text-color">
            {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
            <button
                onClick={toggleMode}
                className="text-blue-500 hover:underline"
            >
                {isLogin ? "Sign up here" : "Log in here"}
            </button>
            </p>
        </div>
        </div>
        <Cursor/>
    </>
  );
}


export default Login