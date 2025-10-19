export function validateUserFields(req, res, next) {
  const { user, password } = req.body;

  if (!user || !password) {
    return res.status(400).send("Login ou senha não informados.");
  }
  next();
}
