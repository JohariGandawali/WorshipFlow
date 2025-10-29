// database.js
import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabaseSync("maghimugApp.db");

// Create tables once
db.execSync(`
  CREATE TABLE IF NOT EXISTS lyrics (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT,
    content TEXT
  );
  CREATE TABLE IF NOT EXISTS voices (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT,
    uri TEXT
  );
`);

export default db;
