import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import axiosApiInstance from "../interceptor";

const API_URL = "api/v1";

const SignUp = () => {
  const navigate = useNavigate();

  // State variables
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role] = useState("Student");
  const [password] = useState("");
  const [confirmPassword] = useState("");
  const [studentId, setStudentId] = useState("");
  const [dept, setDept] = useState("");

  // Function to handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axiosApiInstance.post(
        `${API_URL}/signup`,
        {
          name,
          email,
          role,
          password,
          confirmPassword,
          studentId,
          dept,
        },
        {
          headers: {
            Authorization: `Bearer${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.data.success) {
        navigate("/admin");
        toast.success("Student registered successfully!");
      } else {
        toast.error("Registration failed:");
        console.error("Registration failed:", response.data.message);
      }
    } catch (error) {
      console.error("Error registering student:", error.response);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-lg bg-card p-6 rounded-lg shadow-sm">
        <div className="flex justify-end mb-4">
          <Button variant="ghost" onClick={() => navigate("/admin")}>
            Back
          </Button>
        </div>

        <h2 className="text-2xl font-semibold mb-4">Sign-up a new student</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Name</label>
            <Input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Name"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Role</label>
            <Input id="role" type="text" value={role} readOnly />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Student ID</label>
            <Input
              id="studentId"
              type="text"
              value={studentId}
              onChange={(e) => setStudentId(e.target.value)}
              placeholder="Student ID"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Department</label>
            <select
              id="dept"
              value={dept}
              onChange={(e) => setDept(e.target.value)}
              className="w-full rounded-md border bg-transparent px-3 py-2 text-sm"
              required
            >
              <option value="">Select Department</option>
              <option value="CSE">CSE</option>
              <option value="EEE">EEE</option>
              <option value="BBA">BBA</option>
              <option value="MECHANICAL">MECHANICAL</option>
              <option value="BANGLA">BANGLA</option>
              <option value="ENGLISH">ENGLISH</option>
              <option value="NAVAL">NAVAL</option>
              <option value="LAW">LAW</option>
              <option value="CIVIL">CIVIL</option>
            </select>
          </div>

          <div className="flex justify-end">
            <Button type="submit">Register</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
