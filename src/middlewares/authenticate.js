
import dotenv from "dotenv";
dotenv.config()
export function authenticate(req, res, next) {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).send({ message: "Token inválido" });
  }

  const [, token] = authorization.split(" ");
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(`token decoded: ${JSON.stringify(decoded)}`);
    req.user = decoded;
    console.log(`req user id: ${req.user.id}`);
    next();
  } catch (err) {
    return res.status(401).send({ message: "Token inválido" });
  }
}
