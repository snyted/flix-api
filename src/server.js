import dotenv from "dotenv";
dotenv.config();
import express from "express";
import logGlobal from "./middlewares/logGlobal.js";
import moviesRoutes from "./routes/moviesRoutes.js";
import seriesRoutes from "./routes/seriesRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import favoriteRoutes from "./routes/favoriteRoutes.js";
import search from "./routes/search.js";

const app = express();
const PORT = 3000;

app.use(express.json());

app.use(logGlobal);

app.use("/movies", moviesRoutes);
app.use("/series", seriesRoutes);
app.use("/search", search);
app.use("/favorites", favoriteRoutes);

app.use("/user", userRoutes);

app.listen(PORT, () => console.log("servidor rodando na porta " + PORT));
