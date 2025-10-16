import express from "express";
import moviesRoutes from "./routes/moviesRoutes.js";

const app = express();
const PORT = 3333;

app.use(express.json());

app.use(logGlobal);

app.use("/movies", moviesRoutes);

app.listen(PORT, () => console.log("servidor rodando na porta " + PORT));



// Middleware logging

function logGlobal(req, res, next) {
  console.log("Requisição feita: " + req.method);
  next();
}
