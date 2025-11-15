import { createClient } from "@supabase/supabase-js";

const auth = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export default async function handler(req, res) {
  if (req.method !== "POST")
    return res.status(405).json({ error: "Method not allowed" });

  const { id, password } = req.body;

  if (!id || !password)
    return res.status(400).json({ error: "Missing credentials" });

  const isEmail = id.includes("@");

  const { data, error } = await auth.auth.signInWithPassword({
    [isEmail ? "email" : "phone"]: id,
    password
  });

  if (error) return res.status(400).json({ error: error.message });

  return res.status(200).json({ message: "Login successful", data });
}
