import { Category } from "../model/Category";
import { ICategoryRepository, ICreateCategoryDTO } from "./ICategoryRepository";

class PostgresCategoriesRepository implements ICategoryRepository {
  findByName(name: string): Category {
    console.log(name);

    return null;
  }
  list(): Category[] {
    return null;
  }
  create({ name, description }: ICreateCategoryDTO): void {
    console.log(name, description);
    return null;
  }
}

export { PostgresCategoriesRepository };
