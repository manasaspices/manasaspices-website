import User from "@/models/user";
import connectDB from "@/utils/db";
import bcrypt from "bcryptjs";

export async function POST(req) {
  try {
    const { name, email, phone, password } = await req.json();
    
    await connectDB();

    const existingUser = await User.findOne({ email });
    if (existingUser) return new Response(JSON.stringify({ error: "User already exists" }), { status: 400 });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ name, email, phone, password: hashedPassword });

    return new Response(JSON.stringify({ message: "User created successfully", user: newUser }), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Error registering user" }), { status: 500 });
  }
}
