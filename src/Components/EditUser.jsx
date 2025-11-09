import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";

const API_URL = "/api/v1";

const EditUser = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [user, setUser] = useState({
    name: "",
    email: "",
    dept: "",
    studentId: "",
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${API_URL}/user/${id}`, {
          headers: {
            Authorization: `Bearer${token}`,
          },
        });

        if (response.data.success && response.data.userData) {
          setUser(response.data.userData);
        } else {
          setError("No user found");
        }
      } catch (err) {
        setError(err.response?.data?.message || "Error fetching user data");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserDetails();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(`${API_URL}/user/${id}`, user, {
        headers: {
          Authorization: `Bearer${token}`,
        },
      });

      if (response.data.success) {
        toast.success("User details updated successfully!");
        navigate(`/user/${id}`); // Navigate back to the user detail page
      } else {
        toast.error("Error updating user details");
      }
    } catch (error) {
      toast.error("Error updating user details");
      console.error("Error updating user details:", error);
    }
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="min-h-screen flex items-start justify-center p-6">
      <div className="w-full max-w-xl bg-card p-6 rounded-lg">
        <div className="flex justify-end mb-4">
          <Button variant="ghost" onClick={() => navigate(`/user/${id}`)}>
            Cancel
          </Button>
        </div>

        <h2 className="text-2xl font-semibold mb-4">Edit User</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Name</label>
            <Input
              type="text"
              name="name"
              value={user.name}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <Input
              type="email"
              name="email"
              value={user.email}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Department</label>
            <Input
              type="text"
              name="dept"
              value={user.dept}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Student ID</label>
            <Input
              type="text"
              name="studentId"
              value={user.studentId}
              onChange={handleChange}
              required
            />
          </div>

          <div className="flex justify-end">
            <Button type="submit">Save Changes</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditUser;
