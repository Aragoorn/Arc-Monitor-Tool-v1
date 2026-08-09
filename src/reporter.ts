import * as fs from "fs";
import * as path from "path";
import { DatabaseManager } from "./database";
import { AlertSystem } from "./alerts";

export interface NetworkMetrics {
    blockNumber: number;
    txCount: number;
    gasPriceGwei: string;
    timestamp: string;
    blockHash: string;
}

export class ArcReporter {
    private metricsHistory: NetworkMetrics[] = [];
    private reportDir: string;
    private logDir: string;
    private dbManager: DatabaseManager;
    private alertSystem: AlertSystem;

    constructor() {
        this.reportDir = path.resolve("reports");
        this.logDir = path.resolve("logs");
        this.ensureDirectories();
        this.dbManager = new DatabaseManager();
        this.alertSystem = new AlertSystem(40, 15);
    }

    private ensureDirectories() {
        if (!fs.existsSync(this.reportDir)) fs.mkdirSync(this.reportDir, { recursive: true });
        if (!fs.existsSync(this.logDir)) fs.mkdirSync(this.logDir, { recursive: true });
    }

    public recordMetric(metric: NetworkMetrics) {
        this.metricsHistory.push(metric);
        this.dbManager.saveBlock(metric);
        this.alertSystem.checkAlerts(metric.gasPriceGwei, metric.txCount, metric.blockNumber);
        
        const logLine = `[${metric.timestamp}] BLOCK #${metric.blockNumber} | TXs: ${metric.txCount} | Gas: ${metric.gasPriceGwei} Gwei | Hash: ${metric.blockHash}\n`;
        fs.appendFileSync(path.join(this.logDir, "network-activity.log"), logLine);

        this.generateMarkdownReport();
    }

    private generateMarkdownReport() {
        const totalBlocks = this.metricsHistory.length;
        const avgTx = totalBlocks > 0 
            ? (this.metricsHistory.reduce((acc, curr) => acc + curr.txCount, 0) / totalBlocks).toFixed(2) 
            : "0";

        const markdown = `# 📊 Arc L1 Network Analytics & Telemetry Report

> Professional real-time monitoring dashboard generated for Encode Club Hackathon. (Integrated with SQLite & Smart Alerting)

## 📈 Summary Metrics
* **Total Monitored Blocks:** ${totalBlocks}
* **Average Transactions per Block:** ${avgTx}
* **Last Sync Time:** ${new Date().toISOString()}

## 📜 Recent Block Telemetry
| Block Number | Transactions | Gas Price | Block Hash | Time |
| :--- | :--- | :--- | :--- | :--- |
` + this.metricsHistory.slice(-10).map(m => 
`| #${m.blockNumber} | ${m.txCount} | ${m.gasPriceGwei} Gwei | \`${m.blockHash.substring(0, 10)}...\` | ${m.timestamp} |`
).join("\n");

        fs.writeFileSync(path.join(this.reportDir, "latest-report.md"), markdown);
    }
}