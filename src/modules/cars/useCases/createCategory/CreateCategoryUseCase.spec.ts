import { AppError } from "../../../../errors/AppError";
import { CategoriesRepositoryInMemory } from "../../repositories/in-memory/CategoriesRepositoryInMemory";
import { CreateCategoryUseCase } from "./CreateCategoryUseCase";

let createCategory: CreateCategoryUseCase;
let categoriesRepositoryInMemory: CategoriesRepositoryInMemory;

describe("Create category", () => {
  beforeEach(() => {
    categoriesRepositoryInMemory = new CategoriesRepositoryInMemory();
    createCategory = new CreateCategoryUseCase(categoriesRepositoryInMemory);
  });

  it("should be able to create a new category", async () => {
    const category = {
      name: "Category Test",
      description: "Category description test",
    };
    await createCategory.execute(category);

    const createdCategory = await categoriesRepositoryInMemory.findByName(
      "Category Test"
    );

    expect(createdCategory).toHaveProperty("id");
  });

  it("should not be able to create a category that already exists", async () => {
    expect(async () => {
      const category = {
        name: "Category Test",
        description: "Category description test",
      };
      await createCategory.execute(category);

      await createCategory.execute(category);
    }).rejects.toBeInstanceOf(AppError);
  });
});
