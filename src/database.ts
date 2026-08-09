import sqlite3 from "sqlite3";
import * as path from "path";
import * as fs from "fs";

export class DatabaseManager {
    private db: sqlite3.Database;

    constructor() {
        const dbDir = path.resolve("data");
        if (!fs.existsSync(dbDir)) fs.mkdirSync(dbDir, { recursive: true });
        
        const dbPath = path.join(dbDir, "metrics.db");
        this.db = new sqlite3.Database(dbPath, (err) => {
            if (err) {
                console.error("Database connection error:", err.message);
            } else {
                this.initTable();
            }
        });
    }

    private initTable() {
        const query = `
            CREATE TABLE IF NOT EXISTS blocks (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                blockNumber INTEGER,
                txCount INTEGER,
                gasPriceGwei TEXT,
                blockHash TEXT,
                timestamp TEXT
            )
        `;
        this.db.run(query);
    }

    public saveBlock(data: { blockNumber: number; txCount: number; gasPriceGwei: string; blockHash: string; timestamp: string }) {
        const query = `INSERT INTO blocks (blockNumber, txCount, gasPriceGwei, blockHash, timestamp) VALUES (?, ?, ?, ?, ?)`;
        this.db.run(query, [data.blockNumber, data.txCount, data.gasPriceGwei, data.blockHash, data.timestamp], (err) => {
            if (err) {
                console.error("Error saving to database:", err.message);
            }
        });
    }
}