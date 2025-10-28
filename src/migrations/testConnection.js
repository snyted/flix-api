import { pool } from '../config/db.js';

async function testConnection() {
  try {
    const result = await pool.query('SELECT NOW()'); // comando simples pra ver se o banco responde
    console.log('Conectado ao banco com sucesso!');
    console.log('Hora do servidor:', result.rows[0].now);
  } catch (err) {
    console.error('Erro ao conectar ao banco:', err.message);
  } finally {
    pool.end();
  }
}

testConnection();
