import fs from "fs";
import path from "path";
import pool from "./src/config/db.js";

async function runMigrations() {
  const migrationsDir = path.join(process.cwd(), "migrations");
  const files = fs.readdirSync(migrationsDir).sort();

  for (const file of files) {
    const fullPath = path.join(migrationsDir, file);
    const sql = fs.readFileSync(fullPath, "utf8");

    console.log(`Executando migration: ${file}`);
    try {
      await pool.query(sql);
      console.log(`Migration concluída: ${file}`);
    } catch (err) {
      console.error(`Erro ao rodar ${file}`, err);
      process.exit(1);
    }
  }

  await pool.end();
}

runMigrations();
