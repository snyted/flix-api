import bcrypt from "bcrypt";
import { users } from "../data/users.js";

export async function registerController(req, res) {
  const { user, password } = req.body;

  if (users.find((u) => u.user === user)) {
    return res.status(400).send({ message: `Usuário ${user} já existe.` });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  users.push({ user, password: hashedPassword });

  console.log(
    `Usuário cadastrado: ${user}, usuários: ${JSON.stringify(users)}`
  );

  res.status(201).send({ user, message: "Cadastro efetuado com sucesso!" });
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

  res.status(200).send({ message: "Login efetuado!" });
}
