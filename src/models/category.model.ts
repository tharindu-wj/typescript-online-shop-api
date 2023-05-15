import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

export interface CategoryInput {
  title: string;
  description: string;
  image: string;
}

export interface CategoryDocument extends CategoryInput, mongoose.Document {
  title: string;
  description: string;
  image: string;
  createdAt: Date;
  updatedAt: Date;
}

const CategorySchema = new mongoose.Schema(
  {
    categoryId: {
      type: String,
      required: true,
      unique: true,
      default: () => `category_${uuidv4()}`,
    },
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const CategoryModel = mongoose.model<CategoryDocument>(
  "Category",
  CategorySchema
);

export default CategoryModel;
