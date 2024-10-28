import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // Import useAuth

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth(); // Get the login function

  const handleLogin = () => {
    if (username === "admin" && password === "password") {
      login(); // Call login function
      navigate("/dashboard");
    } else {
      alert("Incorrect credentials");
    }
  };

  // Add onKeyDown handler to trigger login on "Enter" key press
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleLogin();
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-80 bg-white p-8 shadow-md rounded">
        <h2 className="text-center mb-6 text-xl font-bold">Admin Login</h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={handleKeyDown} // Attach event handler here
          className="w-full p-2 mb-4 border rounded"
        />
        <button
          onClick={handleLogin}
          className="w-full bg-blue-500 text-white py-2 rounded"
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;
