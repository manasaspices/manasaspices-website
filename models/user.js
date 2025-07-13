import mongoose from "mongoose";

const CartItemSchema = new mongoose.Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
  url:{ type: String, required: true},
  name: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  netwt: {type: String, required: true},
  image: { type: String }, 
});

const AddressSchema = new mongoose.Schema({
  street: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  zip: { type: String, required: true },
  country: { type: String, required: true },
});

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  phone: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  cart: { type: [CartItemSchema], default: [] }, // Array of cart items
  address: { type: AddressSchema }, // Optional, user can add an address later
});

export default mongoose.models.User || mongoose.model("User", UserSchema);
