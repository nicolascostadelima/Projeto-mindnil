const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

// Rota padrão
app.get("/", (req, res) => {
  res.send("Servidor funcionando");
});

// IMPORTA O BANCO
const pool = require("./db");

// ROTA PARA TESTAR O BANCO
app.get("/test-db", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");
    res.json({
      status: "Conectado ao banco!",
      hora_atual: result.rows[0]
    });
  } catch (error) {
    console.error("Erro ao conectar:", error);
    res.status(500).json({ erro: "Falha ao conectar ao banco." });
  }
});

// Iniciar servidor
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
