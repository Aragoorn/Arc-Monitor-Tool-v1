import { formatUnits } from "ethers";
import * as dotenv from "dotenv";
import { ArcReporter } from "./reporter";
import { createResilientProvider } from "./provider";

dotenv.config();

const ARC_RPC_URL = process.env.ARC_RPC_URL || "https://rpc.testnet.arc.network";
const provider = createResilientProvider(ARC_RPC_URL);
const reporter = new ArcReporter();

let latestGasPrice = "0";

async function monitorArcNetwork() {
    console.log("\x1b[36m%s\x1b[0m", "==================================================");
    console.log("\x1b[32m%s\x1b[0m", "   🚀 Arc L1 Enterprise Telemetry & Monitor Active 🚀   ");
    console.log("\x1b[36m%s\x1b[0m", "==================================================");
    
    // رصد ایمن قیمت گاز
    setInterval(async () => {
        try {
            const feeData = await provider.getFeeData();
            if (feeData.gasPrice) {
                latestGasPrice = parseFloat(formatUnits(feeData.gasPrice, "gwei")).toFixed(4);
                console.log("\x1b[33m%s\x1b[0m", `[GAS INFO] Arc L1 Gas Price: ${latestGasPrice} Gwei`);
            }
        } catch (error: any) {
            console.warn("\x1b[33m%s\x1b[0m", `[WARNING] Failed to fetch gas price temporarily: ${error.message}`);
        }
    }, 12000);

    // رصد ایمن بلاک‌ها
    provider.on("block", async (blockNumber: number) => {
        try {
            const block = await provider.getBlock(blockNumber);
            if (block) {
                const timeStr = new Date(block.timestamp * 1000).toLocaleTimeString();
                
                console.log("\x1b[35m%s\x1b[0m", `[NEW BLOCK] Arc Block #${blockNumber} detected!`);
                console.log(`[TX COUNT] Transactions: ${block.transactions.length}`);
                console.log(`[HASH] Block Hash: ${block.hash}`);
                console.log(`[TIMESTAMP] Mined at: ${timeStr}`);
                console.log("--------------------------------------------------");
                
                reporter.recordMetric({
                    blockNumber,
                    txCount: block.transactions.length,
                    gasPriceGwei: latestGasPrice,
                    timestamp: timeStr,
                    blockHash: block.hash || "N/A"
                });
            }
        } catch (error: any) {
            console.error("\x1b[31m%s\x1b[0m", `[ERROR] Failed processing block #${blockNumber}:`, error.message);
        }
    });
}

// مدیریت خطاهای سراسری برای جلوگیری از کرش برنامه
process.on("unhandledRejection", (reason: any) => {
    console.error("\x1b[31m%s\x1b[0m", "[FATAL] Unhandled Promise Rejection:", reason?.message || reason);
});

process.on("uncaughtException", (error: Error) => {
    console.error("\x1b[31m%s\x1b[0m", "[FATAL] Uncaught Exception:", error.message);
});

monitorArcNetwork().catch((error) => {
    console.error("\x1b[31m%s\x1b[0m", "Critical startup error:", error);
});