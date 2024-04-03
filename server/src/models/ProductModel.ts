import mongoose from "mongoose";
export interface IProduct extends mongoose.Document {
  name: string;
  description: string;
  price: number;
  quantity: number;
  image?: string;
  ean: string;
  category: string;
 
  
}
const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true }  ,
  quantity: { type: Number, required: true },
  image: { type: String },
  ean: { type: String, required: true },
  createdAt: { type: Date, default: Date.now() }
});
export default mongoose.model<IProduct>("Product", ProductSchema);