const express = require("express");

const app = express();

const PORT = 3333;

app.use(express.json());

app.get("/", logHttp, (req, res) => {
  res.send("Funcionando....");
});

app.listen(PORT, () => console.log("servidor rodando na porta " + PORT));

function logHttp(req, res, next) {
  console.log(req.method);
  next();
}
