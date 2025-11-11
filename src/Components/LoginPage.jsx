import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import axiosApiInstance from "../interceptor";

// import "./LoginPage.css";

const API_URL = "api/v1";

const LoginPage = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const isValidEmail = (email) => {
    // A regular expression for email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  const loginUser = async (e) => {
    e.preventDefault();
    const { email, password } = data;

    // Validate email format
    if (!isValidEmail(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    try {
      // Make a POST request to the login endpoint
      const response = await axiosApiInstance.post(`${API_URL}/login`, {
        email,
        password,
      });

      // Handle the response and retrieve token and user
      const { token, user } = response.data;

      // Store the token in local storage
      localStorage.setItem("token", token);

      // Mark user as logged in
      localStorage.setItem("isLogedIn", true);

      // Navigate based on user role
      if (user.role === "Student") {
        localStorage.setItem("studentUser", JSON.stringify(user));
        navigate("/student");
        toast("Student Dashboard");
      } else if (user.role === "Admin") {
        localStorage.setItem("adminUser", JSON.stringify(user));
        navigate("/admin");
        toast("Admin Dashboard");
      }
    } catch (error) {
      // Handle login errors
      if (error.response && error.response.status === 404) {
        toast.error("Email not found in our records. Please try again.");
      } else {
        console.error(error);
        toast.error("Login failed. Server error!!!.");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-slate-900">
      <form
        onSubmit={loginUser}
        className="w-full max-w-md bg-slate-800 p-8 rounded-xl shadow-2xl border border-slate-700"
      >
        <div className="text-center mb-8">
          <div className="w-12 h-12 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-xl flex items-center justify-center mx-auto mb-4">
            <span className="text-white font-bold text-xl">I</span>
          </div>
          <h2 className="text-2xl font-bold text-slate-100">Welcome back</h2>
          <p className="text-slate-400 mt-1">Sign in to your account</p>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2 text-slate-200">
              Email
            </label>
            <Input
              type="email"
              placeholder="you@example.com"
              required
              value={data.email}
              onChange={(e) => setData({ ...data, email: e.target.value })}
              className="bg-slate-700 border-slate-600 text-slate-100 placeholder-slate-400 focus:border-emerald-500 focus:ring-emerald-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-slate-200">
              Password
            </label>
            <Input
              type="password"
              placeholder="Enter your password"
              required
              value={data.password}
              onChange={(e) => setData({ ...data, password: e.target.value })}
              className="bg-slate-700 border-slate-600 text-slate-100 placeholder-slate-400 focus:border-emerald-500 focus:ring-emerald-500"
            />
          </div>

        <div className="mt-8">
          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white py-3 rounded-lg font-medium transition-all duration-200"
          >
            Sign in
          </Button>
        </div>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
