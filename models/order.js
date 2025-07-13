import mongoose from "mongoose";

const CartItemSchema = new mongoose.Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  netwt: {type: String, required: true},
  image: { type: String }, // Optional, if storing image URLs
});

const AddressSchema = new mongoose.Schema({
  name: {type: String, required:true},
  email: {type:String, required: false},
  phone:{ type:String, required: true},
  street: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  zip: { type: String, required: true },
  country: { type: String, required: true },
});

const OrderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: false }, // Allow null for guests
  userType: { type: String, enum: ["Registered", "Guest"], required: true },
  items: { type: [CartItemSchema], required: true }, 
  totalAmount: { type: Number, required: true },
  shippingAddress: { type: AddressSchema, required: true }, 
  paymentStatus: { type: String, enum: ["Pending", "Paid"], default: "Pending" },
  paymentId: { type: String, required: true },  
  orderId: { type: String, required: true },    
  createdAt: { type: Date, default: Date.now },
  captured: { type: Boolean, required: true},
  status: { type: String, required: true},
});

export default mongoose.models.Order || mongoose.model("Order", OrderSchema);
