import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  index: { type: String, required: true },
  url: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  price: { type: [Float32Array], required: true },
  mrp: { type: [Float32Array], required: true},
  off: { type: [Float32Array], required: true},
  prod_desc: { type: String, required: true },
  description: { type: String, required: true },
  origin: { type: String, required: true },
  healthben: { type: String, required: true },
  quantity: { type: [String], required: true },
  ingredient: { type: String, required: true },
  shelflife: { type: String, required: true },
  storageinst: { type: String, required: true },
  specfeats: { type: String, required: true },
  certifs: { type: String, required: true },
  region: { type: String, required: true },
  imgs: { type: [String], required: true },
  thumbnail_img: { type: String, required: true },
  category: { type: String, required: true },
}, { timestamps: true });

export default mongoose.models.Product || mongoose.model("Product", ProductSchema);
