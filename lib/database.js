import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

// Open the SQLite database
export async function openDb() {
  return open({
    filename: './mydatabase.db',  // SQLite file name
    driver: sqlite3.Database
  });
}
