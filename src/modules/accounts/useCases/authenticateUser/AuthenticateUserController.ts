import { Request, Response } from "express";
import { container } from "tsyringe";

import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";

class AuthenticateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;
    const authenticateUserUseCase = container.resolve(AuthenticateUserUseCase);
    try {
      const authentication = await authenticateUserUseCase.execute({
        email,
        password,
      });

      return response.json(authentication);
    } catch (error) {
      return response
        .status(400)
        .json({ message: error.message || "Unexpected error." });
    }
  }
}

export { AuthenticateUserController };
