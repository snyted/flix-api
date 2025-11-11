import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import pool from "../config/db.js";
import { getUserByNameService } from "../services/userServices.js";

export async function registerController(req, res) {
  const { user, password } = req.body;

  try {
    const foundUser = await getUserByNameService(user);
    if (foundUser) {
      return res.status(400).json({ message: `Usuário ${user} já existe.` });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    await pool.query("INSERT INTO users (name, password) VALUES ($1, $2)", [
      user,
      hashedPassword,
    ]);

    res.status(201).send({ user, message: "Cadastro efetuado com sucesso!" });
  } catch (err) {
    console.error("Erro ao cadastrar usuário:", err);
    res.status(500).send({ message: "Erro no servidor" });
  }
}

export async function loginController(req, res) {
  const { user, password } = req.body;

  try {
    const foundUser = await getUserByNameService(user);

    if (!foundUser || !(await bcrypt.compare(password, foundUser.password))) {
      return res.status(401).json({ message: "Usuário ou senha incorretos" });
    }

    const token = jwt.sign({ id: foundUser.id }, "minhaChaveTemporaria", {
      expiresIn: "1h",
    });

    res.status(200).json({ message: "Login efetuado!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro no servidor" });
  }
}
