import csvParse from "csv-parse";
import fs from "fs";

import { Category } from "../../model/Category";
import { ICategoriesRepository } from "../../repositories/ICategoriesRepository";
import { CreateCategoryUseCase } from "../createCategory/CreateCategoryUseCase";

interface IImportCategory {
  name: string;
  description: string;
}
class ImportCategoryUseCase {
  constructor(private createCategoryUseCase: CreateCategoryUseCase) {}

  loadCategories(file: Express.Multer.File): Promise<IImportCategory[]> {
    return new Promise((resolve, reject) => {
      const stream = fs.createReadStream(file.path);
      const categories: IImportCategory[] = [];

      const parseFile = csvParse();

      stream.pipe(parseFile);

      parseFile
        .on("data", async (line) => {
          const [name, description] = line;
          categories.push({ name, description });
        })
        .on("end", () => {
          resolve(categories);
        })
        .on("error", (err) => {
          reject(err);
        });
    });
  }

  async execute(file: Express.Multer.File): Promise<void> {
    // Should it be the create Category Use Case instead repository?
    const categories = await this.loadCategories(file);

    categories.map((category) => {
      const { name, description } = category;
      this.createCategoryUseCase.execute({ name, description });
    });
  }
}

export { ImportCategoryUseCase };
