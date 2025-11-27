const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const pool = require("./db"); // importa só uma vez

const app = express();
app.use(express.json());
app.use(cors());

// Rota padrão
app.get("/", (req, res) => {
  res.send("Servidor funcionando");
});

// Rota para testar o banco
app.get("/test-db", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");
    res.json({
      status: "Conectado ao banco!",
      hora_atual: result.rows[0],
    });
  } catch (error) {
    console.error("Erro ao conectar:", error);
    res.status(500).json({ erro: "Falha ao conectar ao banco." });
  }
});

// Rota de registro de usuário
app.post("/registrar", async (req, res) => {
  const { nome, email, senha } = req.body;

  try {
    // Verifica se email já existe
    const userExists = await pool.query(
      "SELECT * FROM usuarios WHERE email = $1",
      [email]
    );

    if (userExists.rows.length > 0) {
      return res.status(400).json({ erro: "Email já cadastrado" });
    }

    // Criptografa a senha
    const senhaCriptografada = await bcrypt.hash(senha, 10);

    // Insere usuário
    await pool.query(
      "INSERT INTO usuarios (nome, email, senha) VALUES ($1, $2, $3)",
      [nome, email, senhaCriptografada]
    );

    res.status(201).json({ mensagem: "Usuário registrado com sucesso!" });

  } catch (erro) {
    console.log("Erro ao registrar:", erro);
    res.status(500).json({ erro: "Erro no servidor" });
  }
});

// Iniciar servidor
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
