const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',      // seu usuário
  host: 'localhost',     // seu computador
  database: 'postgres',  // nome do banco
  password: 'Nicolas300805', // coloque sua senha
  port: 5432,            // porta padrão
});

module.exports = pool;