import { Router } from "express";

import { CreateSpecificationController } from "@modules/cars/useCases/createSpecification/CreateSpecificationController";

import { ensureAdmin } from "../middlewares/ensureAdmin";
import { ensureAuthentication } from "../middlewares/ensureAuthenticated";

const specificationsRoutes = Router();

const createSpecificationController = new CreateSpecificationController();
specificationsRoutes.use(ensureAuthentication);
specificationsRoutes.post(
  "/",
  ensureAdmin,
  createSpecificationController.handle
);

export { specificationsRoutes };
