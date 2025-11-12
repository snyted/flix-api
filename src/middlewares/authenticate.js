import jwt from "jsonwebtoken";
export function authenticate(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).send({ message: "Token não fornecido" });
  }

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, "minhaChaveTemporaria");
    console.log(`token decoded: ${decoded}`);
    req.user = decoded;
    console.log(`req user id: ${req.user.id}, ${req.user}`);
    next();
  } catch (err) {
    return res.status(401).send({ message: "Token inválido" });
  }
}
