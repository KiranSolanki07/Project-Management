import AuthLayout from "./AuthLayout";
import { Link } from "react-router-dom";
import { useState } from "react";
import { API_URL } from "../config/api";


const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSignup = async () => {
    setErrorMsg("");

    if (!firstName || !lastName || !email || !password) {
      setErrorMsg("All fields are required.");
      return;
    }

    try {
      setLoading(true);


      const response = await fetch(`${API_URL}/api/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ firstName, lastName, email, password }),
      });

      const result = await response.json();
      setLoading(false);

      if (!response.ok) {
        setErrorMsg(result.error || "Signup failed.");
        return;
      }

      alert("Signup successful! Please check your email.");
      console.log("Signed up:", result.data);

    } catch (err: any) {
      setErrorMsg("Something went wrong. Try again.");
      setLoading(false);
    }
  };

  return (
    <AuthLayout title="Sign up">
      {/* --- UI unchanged --- */}
      <div className="space-y-3 mb-6">
        <button className="w-full border rounded-2xl py-2.5 flex items-center justify-center gap-3 hover:bg-gray-50">
          <img src="https://cdn-icons-png.flaticon.com/512/124/124010.png" className="w-5" />
          Sign up with Facebook
        </button>
        <button className="w-full border rounded-2xl py-2.5 flex items-center justify-center gap-3 hover:bg-gray-50">
          <img src="https://cdn-icons-png.flaticon.com/512/300/300221.png" className="w-5" />
          Sign up with Google
        </button>
      </div>

      <div className="flex items-center gap-3 my-5">
        <span className="flex-1 border-t"></span>
        <span className="text-xs text-gray-500">OR</span>
        <span className="flex-1 border-t"></span>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <input
          type="text"
          placeholder="First name"
          className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-400"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Last name"
          className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-400"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
      </div>

      <input
        type="email"
        placeholder="Email address"
        className="w-full mt-3 border rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-400"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        className="w-full mt-3 border rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-400"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      {errorMsg && <p className="text-red-500 text-sm mt-2">{errorMsg}</p>}

      <button
        onClick={handleSignup}
        disabled={loading}
        className="w-full bg-black text-white font-semibold py-3 rounded-2xl mt-6 hover:bg-gray-900 disabled:bg-gray-700"
      >
        {loading ? "Creating account..." : "Sign up"}
      </button>

      <p className="text-center text-sm text-gray-600 mt-5">
        Already have an account?{" "}
        <Link to="/login" className="text-indigo-600 font-medium hover:underline">
          Log in
        </Link>
      </p>
    </AuthLayout>
  );
};

export default Signup;
