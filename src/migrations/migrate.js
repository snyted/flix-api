import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import pool from "../config/db.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function runMigrations() {
  const migrationsDir = __dirname; 

  const files = fs
    .readdirSync(migrationsDir)
    .filter((f) => f.endsWith(".sql"))
    .sort();

  for (const file of files) {
    const fullPath = path.join(migrationsDir, file);
    const sql = fs.readFileSync(fullPath, "utf8");

    console.log(`Executando migration: ${file}`);

    try {
      await pool.query(sql);
      console.log(`Migration concluída: ${file}`);
    } catch (err) {
      console.error(`Erro ao rodar ${file}\n`, err);
      process.exit(1);
    }
  }

  await pool.end();
  console.log("\n Todas as migrations foram aplicadas.");
}

runMigrations();
