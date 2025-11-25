const express = require("express");
const cors = require("cors");

const app = express();

// Permite o backend receber JSON
app.use(express.json());

// Libera o acesso do frontend
app.use(cors());

// Rota inicial só para testar
app.get("/", (req, res) => {
  res.send("Servidor funcionando");
});

// Iniciar servidor
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
