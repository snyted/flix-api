import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { AppError } from "../../shared/errors/app.error.js";
import { LoginDTO, LoginResponseDTO, RegisterDTO } from "./auth.dtos.js";
import { IUserRepository } from "../user/user.types.js";

export class AuthService {
  constructor(private userRepository: IUserRepository) {
  }

  public async register(data: RegisterDTO): Promise<boolean> {

    if (data.password !== data.confirmPassword) {
      throw new AppError(400, "Unmatching passwords.")
    }

    if (data.password.length < 8 || data.password.length > 64) {
      throw new AppError(400, "Invalid password. Try at least 8 characters.")
    }

    const isFounded = await this.userRepository.find(data.username)

    if (isFounded) {
      throw new AppError(400, "User already exists.");
    }

    const hash = await bcrypt.hash(data.password, 10);

    await this.userRepository.create(data.username, hash);

    return true;
  }

  async login(data: LoginDTO): Promise<LoginResponseDTO> {
    const dbUser = await this.userRepository.find(data.username)

    if (!dbUser) {
      throw new AppError(401, "User or Password incorrect.");
    }

    const match = await bcrypt.compare(data.password, dbUser.password);

    if (!match) {
      throw new AppError(401, "User or Password incorrect.");
    }

    const jwtSecret = process.env.JWT_SECRET

    if (!jwtSecret) {
      throw new Error("JWT_SECRET is not set in the environment variables.");
    }

    const token = jwt.sign({ sub: dbUser.id.toString() }, jwtSecret, { algorithm: "HS256", expiresIn: "1h", });

    return { token, username: dbUser.username };
  }
}