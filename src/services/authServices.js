import bcrypt from "bcrypt";
import { findUserByName, createUser } from "../repository/userRepo.js";
import jwt from "jsonwebtoken";
import { ApiError } from "../utils/ApiError.js";

export async function register(user, password) {
  const foundUser = await findUserByName(user);
  if (foundUser) {
    throw new ApiError(400, "Usuário já existe.");
  }

  const hash = await bcrypt.hash(password, 10);

  await createUser(user, hash);

  return true;
}

export async function login(username, password) {
  const user = await findUserByName(username);

  if (!user) {
    throw new ApiError(401, "Usuário ou senha incorretos.");
  }

  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    throw new ApiError(401, "Usuário ou senha incorretos.");
  }

  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

  return { token, username: user.name };
}
