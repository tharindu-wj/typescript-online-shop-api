import { Request, Response } from "express";
import { CreateCategoryInput } from "../schema/category.schema";
import { createCategory } from "../service/category.service";
import { findProducts } from "../service/product.service";

export async function createCategoryHandler(
  req: Request<{}, {}, CreateCategoryInput["body"]>,
  res: Response
) {
  const body = req.body;

  const category = await createCategory(body);

  return res.send(category);
}

export async function getCategoryProductsHandler(req: Request, res: Response) {
  const categoryId = req.params.categoryId;
  const products = await findProducts({ category: categoryId });

  return res.send(products);
}
