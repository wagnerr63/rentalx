import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";

import { CreateCarUseCase } from "./CreateCarUseCase";

let createCarUseCase: CreateCarUseCase;
let carsRepository: ICarsRepository;

describe("Create Car", () => {
  beforeEach(() => {
    carsRepository = new CarsRepositoryInMemory();
    createCarUseCase = new CreateCarUseCase(carsRepository);
  });

  it("should be able to create a new car", async () => {
    const car = await createCarUseCase.execute({
      name: "Car name",
      description: "Car description",
      daily_rate: 100,
      license_plate: "ABC-1234",
      fine_amount: 60,
      brand: "Test brand",
      category_id: "1234556",
    });
    expect(car).toHaveProperty("id");
  });

  it("should not be able to create a car with a license plate already registered", () => {
    expect(async () => {
      await createCarUseCase.execute({
        name: "Car 1",
        description: "Car description",
        daily_rate: 100,
        license_plate: "ABC-1234",
        fine_amount: 60,
        brand: "Test brand",
        category_id: "1234556",
      });

      await createCarUseCase.execute({
        name: "Car 2",
        description: "Car description",
        daily_rate: 100,
        license_plate: "ABC-1234",
        fine_amount: 60,
        brand: "Test brand",
        category_id: "1234556",
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("should be able to create a new car being available by default", async () => {
    const car = await createCarUseCase.execute({
      name: "Car Available",
      description: "Car description",
      daily_rate: 100,
      license_plate: "ABC-1234",
      fine_amount: 60,
      brand: "Test brand",
      category_id: "1234556",
    });

    expect(car.available).toBe(true);
  });
});
