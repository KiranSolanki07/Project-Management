import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

// SAFE: service role key stays ONLY IN BACKEND
const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// SIGNUP API
app.post("/api/signup", async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  const { data, error } = await supabase.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
    user_metadata: {
      fullName: `${firstName} ${lastName}`,
    },
  });

  if (error) return res.status(400).json({ error: error.message });

  res.json({ message: "Signup successful", data });
});

// LOGIN API
app.post("/api/login", async (req, res) => {
  const { id, password } = req.body;
  const isEmail = id.includes("@");

  const { data, error } = await supabase.auth.signInWithPassword(
    isEmail ? { email: id, password } : { phone: id, password }
  );

  if (error) return res.status(400).json({ error: error.message });

  res.json({ message: "Login successful", data });
});

app.listen(3000, () => console.log("Backend running on http://localhost:3000"));
