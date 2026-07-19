import { JsonRpcProvider, formatUnits } from "ethers";

// Arc Network RPC (Official Endpoint)
const ARC_RPC_URL = "https://rpc.testnet.arc.network"; 
const provider = new JsonRpcProvider(ARC_RPC_URL);

async function monitorArcNetwork() {
    console.log("=== Starting Arc L1 Gas & Network Monitor ===");
    
    // Monitor Gas Fees
    setInterval(async () => {
        try {
            const feeData = await provider.getFeeData();
            if (feeData.gasPrice) {
                const gasInGwei = formatUnits(feeData.gasPrice, "gwei");
                console.log(`[GAS INFO] Arc L1 Gas Price: ${parseFloat(gasInGwei).toFixed(4)} Gwei`);
            }
        } catch (error) {
            console.error("Error fetching Arc gas data:", error);
        }
    }, 10000);

    // Monitor New Blocks
    provider.on("block", async (blockNumber: number) => {
        try {
            const block = await provider.getBlock(blockNumber);
            if (block) {
                console.log(`\n--------------------------------------------`);
                console.log(`[NEW BLOCK] Arc Block #${blockNumber} detected!`);
                console.log(`[TX COUNT] Transactions in this block: ${block.transactions.length}`);
                console.log(`[TIMESTAMP] Mined at: ${new Date(block.timestamp * 1000).toLocaleTimeString()}`);
                console.log(`--------------------------------------------`);
            }
        } catch (error) {
            console.error(`Error fetching block ${blockNumber}:`, error);
        }
    });
}

monitorArcNetwork().catch((error) => {
    console.error("Critical error in Arc monitor:", error);
});