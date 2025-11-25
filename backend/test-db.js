const pool = require('./db');

async function testConnection() {
  try {
    const result = await pool.query('SELECT NOW()');
    console.log("Conexão bem sucedida! Hora atual:", result.rows[0]);
  } catch (error) {
    console.error("Erro ao conectar:", error);
  }
}

testConnection();
