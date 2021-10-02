import { Router } from "express";

import { CategoriesRepository } from "../repositories/CategoriesRepository";

const categoriesRoutes = Router();
const catetoriesRepository = new CategoriesRepository();

categoriesRoutes.post("/", (request, response) => {
  const { name, description } = request.body;

  const categoryAlreadyExists = catetoriesRepository.findByName(name);
  if (categoryAlreadyExists) {
    return response
      .status(400)
      .json({ message: "This category name is already in use." });
  }

  catetoriesRepository.create({ name, description });

  return response.status(201).send();
});

categoriesRoutes.get("/", (request, response) => {
  const categories = catetoriesRepository.list();
  return response.json(categories);
});

export { categoriesRoutes };
