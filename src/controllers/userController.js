import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import pool from "../config/db.js";

export async function registerController(req, res) {
  try {
    const { user, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    await pool.query(
      "INSERT INTO users (name, password) VALUES ($1, $2)",
      [user, hashedPassword]
    );

    res.status(201).send({ user, message: "Cadastro efetuado com sucesso!" });
  } catch (err) {
    console.error("Erro ao cadastrar usuário:", err);
    res.status(500).send({ message: "Erro no servidor" });
  }
}

export async function loginController(req, res) {
  const { user, password } = req.body;

  const searchUser = users.find((u) => u.user === user);

  if (!searchUser) {
    return res.status(401).send({ message: "Usuário ou senha incorretos" });
  }

  const passwordMatch = await bcrypt.compare(password, searchUser.password);

  if (!passwordMatch) {
    return res.status(401).send({ message: "Usuário ou senha incorretos" });
  }

  const token = jwt.sign({ id: user.id }, "minhaChaveTemporaria", {
    expiresIn: "1h",
  });

  res.status(200).json({ message: "Login efetuado!", token });
}
