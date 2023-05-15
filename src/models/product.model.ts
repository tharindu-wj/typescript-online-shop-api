import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";
import { UserDocument } from "./user.model";
import { CategoryDocument } from "./category.model";

export interface ProductInput {
  user: UserDocument["_id"];
  category: CategoryDocument["_id"];
  title: string;
  description: string;
  image: string;
}

export interface ProductDocument extends ProductInput, mongoose.Document {
  user: UserDocument["_id"];
  category: CategoryDocument["_id"];
  title: string;
  description: string;
  image: string;
  createdAt: Date;
  updatedAt: Date;
}

const productSchema = new mongoose.Schema(
  {
    productId: {
      type: String,
      required: true,
      unique: true,
      default: () => `product_${uuidv4()}`,
    },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const ProductModel = mongoose.model<ProductDocument>("Product", productSchema);

export default ProductModel;
