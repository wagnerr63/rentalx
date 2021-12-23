import { AppError } from "@errors/AppError";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: { name: string; email: string };
  token: string;
}

@injectable()
class AuthenticateUserUseCase {
  constructor(
    @inject("UsersRepository") private usersRepository: IUsersRepository
  ) {}

  async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findByEmail(email);
    if (!user) {
      throw new AppError("E-mail or password incorret!");
    }

    const passwordMatch = await compare(password, user.password);
    if (!passwordMatch) {
      throw new AppError("E-mail or password incorret!");
    }

    const token = sign({}, "644de0e4c2f4b9fd77aa7b958db46c85", {
      subject: user.id,
      expiresIn: "1d",
    });

    return { user: { name: user.name, email: user.email }, token };
  }
}

export { AuthenticateUserUseCase };
