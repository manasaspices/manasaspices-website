import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import mongoose from "mongoose";

export async function POST(req) {
  const products = await mongoose.connection.db.collection("products").find({}).toArray();
  const session = await getServerSession(authOptions);
  const { cart } = await req.json();
  //console.log("Incoming cart", JSON.stringify(cart, null, 2));

  if (!Array.isArray(cart)) {
    return Response.json({ message: "Invalid cart format" }, { status: 400 });
  }

  const updatedCart = [];
  const changedItems = [];

  for (const item of cart) {
    const product = products.find(p => p._id.toString() === item._id.toString());

    if (!product) {
      //console.log(`Product not found for _id: ${item._id}`);
      continue;
    }

    //console.log(`Checking product: ${product.name}`);
    const index = product.quantity.findIndex(
      q => typeof q === "string" && q.trim().toLowerCase() === item.netwt.trim().toLowerCase()
    );

    if (index === -1) {
      //console.log(`No matching quantity variant found for "${item.netwt}" in ${product.name}`);
      continue;
    }

    const currentPrice = product.price?.[index];
    const oldPrice = item.price;
    //console.log(`Matched netwt: "${item.netwt}"`);
    //console.log(`Cart Price: ₹${oldPrice} | DB Price: ₹${currentPrice}`);

    if (oldPrice !== currentPrice) {
     // console.log(`Price changed for ${product.name}`);
      updatedCart.push({ ...item, price: currentPrice });
      changedItems.push({
        name: item.name,
        oldPrice,
        newPrice: currentPrice,
      });
    } else {
     // console.log(`Price unchanged for ${product.name}`);
      updatedCart.push(item); 
    }
  }

  const responseData = {
    validatedCart: updatedCart,
    hasPriceChanges: changedItems.length > 0,
    changedItems,
    user: session?.user || null,
  };

  console.log("Final validate API response:\n", JSON.stringify(responseData, null, 2));

  return Response.json(responseData);
}
