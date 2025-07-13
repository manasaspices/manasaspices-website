import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import connectDB from "@/utils/db";
import User from "@/models/user";

// GET request - Fetch cart
export async function GET(req) {
  await connectDB();
  const session = await getServerSession(authOptions);

  if (!session) {
    return Response.json({ message: "Not authenticated" }, { status: 401 });
  }

  const user = await User.findOne({ email: session.user.email });
  if (!user) {
    return Response.json({ message: "User not found" }, { status: 404 });
  }

  return Response.json(user.cart);
}

// POST request - Add to cart, update quantity, or remove item from cart
export async function POST(req) {
  await connectDB();
  const session = await getServerSession(authOptions);
  const { item } = await req.json();
  console.log(item);

  if (!session) {
    return Response.json({ message: "Not authenticated" }, { status: 401 });
  }

  const user = await User.findOne({ email: session.user.email });

  if (!user) {
    return Response.json({ message: "User not found" }, { status: 404 });
  }

  const existingItem = user.cart.find((cartItem) => cartItem._id.equals(item._id) && cartItem.netwt === item.netwt);

  if (existingItem) {
    if (item.action === "increase") {
      existingItem.quantity += 1;
    } else if (item.action === "decrease") {
      existingItem.quantity -= 1;

      if (existingItem.quantity <= 0) {
        user.cart = user.cart.filter((cartItem) => !(cartItem._id.equals(item._id) && cartItem.netwt === item.netwt));
      }
    } else if (item.action === "remove") {
      user.cart = user.cart.filter((cartItem) => !(cartItem._id.equals(item._id) && cartItem.netwt === item.netwt));
    }
  } else if (item.action === "increase") {
    user.cart.push({
      _id: item._id,
      url: item.url,
      name: item.name,
      price: item.price, 
      quantity: 1,
      netwt: item.netwt,
      image: item.image,
    });
  }

  await user.save();
  console.log(user.cart);
  return Response.json(user.cart);
}

// DELETE request - Clear the cart after checkout
export async function DELETE(req) {
  await connectDB();
  const session = await getServerSession(authOptions);

  if (!session) {
    return Response.json({ message: "Not authenticated" }, { status: 401 });
  }

  const user = await User.findOne({ email: session.user.email });

  if (!user) {
    return Response.json({ message: "User not found" }, { status: 404 });
  }

  // Empty the cart
  user.cart = [];

  await user.save();
  return Response.json({ message: "Cart cleared successfully" });
}

// PUT  request - to update the cart whenever the price of products changes
export async function PUT(req) {
  await connectDB();
  const { userId, cart } = await req.json();

  if (!userId || !Array.isArray(cart)) {
    return Response.json({ message: "Invalid request" }, { status: 400 });
  }

  try {
    const result = await User.findByIdAndUpdate(
      userId,
      { cart },
      { new: true }
    );

    if (!result) {
      return Response.json({ message: "User not found" }, { status: 404 });
    }

    return Response.json({ message: "Cart updated successfully" });
  } catch (error) {
    console.error("DB update error:", error);
    return Response.json({ message: "Internal Server Error" }, { status: 500 });
  }
}