import axios from "axios";

export class AlertSystem {
    private gasThreshold: number;
    private txThreshold: number;
    private discordWebhookUrl: string;

    constructor(gasThresholdGwei: number = 40, txThresholdCount: number = 15) {
        this.gasThreshold = gasThresholdGwei;
        this.txThreshold = txThresholdCount;
        // آدرس وب‌هوک دیسکورد از متغیر محیطی خوانده می‌شود (اختیاری)
        this.discordWebhookUrl = process.env.DISCORD_WEBHOOK_URL || "";
    }

    public async checkAlerts(gasPrice: string, txCount: number, blockNumber: number) {
        const gasNum = parseFloat(gasPrice);

        if (gasNum >= this.gasThreshold) {
            const msg = `🚨 [HIGH GAS WARNING] Arc L1 Gas Price reached ${gasPrice} Gwei on Block #${blockNumber}!`;
            console.log("\x1b[41m\x1b[37m%s\x1b[0m", ` ${msg} `);
            await this.sendDiscordAlert(msg);
        }

        if (txCount >= this.txThreshold) {
            const msg = `⚠️ [HIGH TRAFFIC] Block #${blockNumber} contains ${txCount} transactions!`;
            console.log("\x1b[43m\x1b[30m%s\x1b[0m", ` ${msg} `);
            await this.sendDiscordAlert(msg);
        }
    }

    private async sendDiscordAlert(message: string) {
        if (!this.discordWebhookUrl) return; // اگر وب‌هوک تنظیم نشده بود، رد شود
        try {
            await axios.post(this.discordWebhookUrl, { content: message });
        } catch (error) {
            // جلوگیری از کرش در صورت قطع اینترنت هنگام ارسال وب‌هوک
        }
    }
}