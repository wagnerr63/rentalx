import { CategoriesRepository } from "../../repositories/implementations/CategoriesRepository";
import { createCategoryUseCase } from "../createCategory";
import { ImportCategoryController } from "./ImportCategoryController";
import { ImportCategoryUseCase } from "./ImportCategoryUseCase";

const categoriesRepository = CategoriesRepository.getInstance();

const importCategoryUseCase = new ImportCategoryUseCase(createCategoryUseCase);

const importCategoryController = new ImportCategoryController(
  importCategoryUseCase
);

export { importCategoryUseCase, importCategoryController };
