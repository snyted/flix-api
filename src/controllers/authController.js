import { register, login } from "../services/authServices.js";

export async function registerController(req, res, next) {
  const { user, password } = req.body;
  try {
    await register(user, password);

    res.status(201).json({ message: "Cadastro efetuado com sucesso!" });
  } catch (err) {
    next(err);
  }
}

export async function loginController(req, res, next) {
  const { user, password } = req.body;

  try {
    const { token, username } = await login(user, password);

    return res.status(200).json({
      message: "Login efetuado com sucesso!",
      token,
      user: username,
    });
  } catch (err) {
    next(err);
  }
}
