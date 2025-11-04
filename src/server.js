import dotenv from "dotenv";
dotenv.config();
import express from "express";
import moviesRoutes from "./routes/moviesRoutes.js";
import userRoutes from "./routes/userRoutes.js";

const app = express();
const PORT = 3000;

app.use(express.json());

app.use(logGlobal);

app.use("/movies", moviesRoutes);

app.use("/user", userRoutes);

app.listen(PORT, () => console.log("servidor rodando na porta " + PORT));

// Middleware logging
function logGlobal(req, res, next) {
  console.log("Requisição feita: " + req.method);
  next();
}
