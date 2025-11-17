import dotenv from "dotenv";
dotenv.config();
import express from "express";
import logGlobal from "./middlewares/logGlobal.js";
import user from "./routes/userRoutes.js";
import search from "./routes/searchRoutes.js";
import movies from "./routes/moviesRoutes.js";
import series from "./routes/seriesRoutes.js";
import auth from "./routes/authRoutes.js";
import { errorHandler } from "./middlewares/errorHandler.js";

const app = express();

const PORT = 3000;

app.use(express.json());

app.use(logGlobal);

app.use("/me", user);
app.use("/search", search);
app.use("/movies", movies);
app.use("/series", series);
app.use("/auth", auth);

app.use(errorHandler);

app.listen(PORT, () => console.log("servidor rodando na porta " + PORT));
