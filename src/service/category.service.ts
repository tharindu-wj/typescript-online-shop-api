import CategoryModel, { CategoryInput } from "../models/category.model";
// import { databaseResponseTimeHistogram } from "../utils/metrics";

export async function createCategory(input: CategoryInput) {
  const metricsLabels = {
    operation: "createProduct",
  };

  // const timer = databaseResponseTimeHistogram.startTimer();
  try {
    const result = await CategoryModel.create(input);
    // timer({ ...metricsLabels, success: "true" });
    return result;
  } catch (e) {
    // timer({ ...metricsLabels, success: "false" });
    throw e;
  }
}
