// import { openDb } from "./database.js";
const { openDb } = require('./database'); 
async function createTable() {
    const db=await openDb();
    await db.exec(`
        CREATE TABLE IF NOT EXISTS posts (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          title TEXT NOT NULL,
          content TEXT NOT NULL
        );
      `);
}
createTable();