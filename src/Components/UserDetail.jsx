import axios from "axios";
import { useEffect, useState } from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Button } from "../components/ui/button";

const API_URL = "/api/v1";

const UserDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [user, setUser] = useState(null);
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

  // Handler for deleting a user
  const handleDelete = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${API_URL}/user/${id}`, {
        headers: {
          Authorization: `Bearer${token}`,
        },
      });
      toast.success("User deleted successfully!");
      navigate("/admin"); // Navigate back to the admin dashboard
    } catch (error) {
      toast.error("Error deleting user");
      console.error("Error deleting user:", error);
    }
  };

  // Handler for editing a user
  const handleEdit = () => {
    navigate(`/user/edit/${id}`);
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!user) {
    return <p>No user found</p>;
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="flex justify-end mb-4">
        <Button variant="ghost" onClick={() => navigate("/admin")}>
          Back
        </Button>
      </div>

      <h2 className="text-2xl font-semibold mb-6">Student Information</h2>

      <dl className="grid grid-cols-1 gap-4 bg-card p-4 rounded-lg">
        <div className="flex justify-between">
          <dt className="font-medium">Name</dt>
          <dd>{user.name}</dd>
        </div>
        <div className="flex justify-between">
          <dt className="font-medium">Email</dt>
          <dd>{user.email}</dd>
        </div>
        <div className="flex justify-between">
          <dt className="font-medium">Department</dt>
          <dd>{user.dept}</dd>
        </div>
        <div className="flex justify-between">
          <dt className="font-medium">ID</dt>
          <dd>{user.studentId}</dd>
        </div>
      </dl>

      <div className="mt-4 flex gap-2">
        <Button variant="outline" onClick={handleEdit}>
          <FaEdit className="mr-2" /> Edit
        </Button>
        <Button variant="destructive" onClick={handleDelete}>
          <FaTrashAlt className="mr-2" /> Delete
        </Button>
      </div>
    </div>
  );
};

export default UserDetail;
