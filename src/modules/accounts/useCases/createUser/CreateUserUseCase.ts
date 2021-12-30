import { hash } from "bcrypt";
import { injectable, inject } from "tsyringe";

import { User } from "@modules/accounts/infra/typeorm/entities/User";

import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { IUsersRepository } from "../../repositories/IUsersRepository";

@injectable()
class CreateUserUseCase {
  constructor(
    @inject("UsersRepository") private usersRepository: IUsersRepository
  ) {}
  async execute({
    name,
    email,
    driver_license,
    password,
  }: ICreateUserDTO): Promise<void> {
    const userByEmail = await this.usersRepository.findByEmail(email);
    if (userByEmail) {
      throw new Error("This e-mail is already in use.");
    }

    const user = new User();

    const passwordHash = await hash(password, 8);

    Object.assign(user, {
      name,
      email,
      driver_license,
      password: passwordHash,
    });

    await this.usersRepository.create(user);
  }
}

export { CreateUserUseCase };
