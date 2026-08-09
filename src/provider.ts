import { JsonRpcProvider } from "ethers";

export function createResilientProvider(rpcUrl: string): JsonRpcProvider {
    const provider = new JsonRpcProvider(rpcUrl);

    provider.on("error", (error) => {
        console.error("\x1b[31m%s\x1b[0m", "[PROVIDER ERROR] Connection glitch detected, retrying...", error.message);
    });

    return provider;
}