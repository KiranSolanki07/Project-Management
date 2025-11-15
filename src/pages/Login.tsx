import AuthLayout from "./AuthLayout";
import { Link } from "react-router-dom";
import { useState } from "react";
import { API_URL } from "../config/api";


const Login = () => {
  const [id, setId] = useState(""); // email or phone
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleLogin = async () => {
    setErrorMsg("");

    if (!id || !password) {
      setErrorMsg("Please enter email or phone and password.");
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/api/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, password }),
      });

      const result = await response.json();
      setLoading(false);

      if (!response.ok) {
        setErrorMsg(result.error || "Login failed.");
        return;
      }

      alert("Login successful!");
      console.log("Logged in:", result.data);

    } catch (err: any) {
      setErrorMsg("Something went wrong. Try again.");
      setLoading(false);
    }
  };

  return (
    <AuthLayout title="Log in">
      <input
        type="text"
        placeholder="Email or phone"
        className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-400 mb-3"
        value={id}
        onChange={(e) => setId(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-400"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      {errorMsg && <p className="text-red-500 text-sm mt-2">{errorMsg}</p>}

      <button
        onClick={handleLogin}
        disabled={loading}
        className="w-full bg-black text-white font-semibold py-3 rounded-2xl mt-6 hover:bg-gray-900 disabled:bg-gray-700"
      >
        {loading ? "Logging in..." : "Log in"}
      </button>

      <p className="text-center text-sm text-gray-600 mt-5">
        Don’t have an account?{" "}
        <Link to="/signup" className="text-indigo-600 font-medium hover:underline">
          Sign up
        </Link>
      </p>
    </AuthLayout>
  );
};

export default Login;
