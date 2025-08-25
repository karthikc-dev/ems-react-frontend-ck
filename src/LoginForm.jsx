import { useState } from "react";
import './css/Login.css';
import axios from "axios";

export default function LoginForm({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8080/api/auth/login",
        {
          username,
          password
        },
        {
          headers: {
            "Content-Type": "application/json"
          }
        }
      );
      const token = res.data;
      localStorage.setItem("token", token); // store JWT
      onLogin();

    } catch (err) {
      alert("Invalid username or password");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Login</h3>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)} />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)} />
      <button type="submit">Login</button>
    </form>
  );
}
