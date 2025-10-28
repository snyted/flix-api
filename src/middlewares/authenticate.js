import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export function authenticate(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).send({ message: "Token não fornecido" });
  }

  console.log(`Auth Header: ${authHeader}`);
  const token = authHeader.split(" ")[1];
  console.log(`Token: ${token}`);
  try {
    const decoded = jwt.verify(token, "minhaChaveTemporaria");
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).send({ message: "Token inválido" });
  }
}
