<img width="1103" height="993" alt="Screenshot (2157)" src="https://github.com/user-attachments/assets/7c5d9558-fd7e-4ab5-bea3-e3699864308a" />
<img width="1091" height="980" alt="Screenshot (2158)" src="https://github.com/user-attachments/assets/a1e20469-8add-48a2-b3c3-d643c1b3fa57" />

# 🚀 Arc L1 Enterprise Network Monitor & Telemetry Suite

> A professional real-time monitoring, telemetry, and smart alerting utility built for tracking blockchain metrics, gas prices, and block activities on the Arc L1 Testnet. Developed for the Encode Club Hackathon.

---

## 🌟 Key Features

* **Real-Time Block Tracking:** Listens to live network events, capturing block numbers, transaction counts, and unique block hashes instantly.
* **Gas Price Telemetry:** Periodically polls network fee data to calculate and log gas price fluctuations in Gwei.
* **Smart Alerting & Discord Webhooks:** Automated console warnings and real-time Discord webhook notifications for gas spikes and high network traffic.
* **SQLite Database Integration:** Persistent local storage of block telemetry inside a structured SQLite database (`data/metrics.db`).
* **Automated Markdown Reporting:** Dynamically generates professional analytics dashboards (`reports/latest-report.md`) on-the-fly.
* **Bulletproof Error Handling:** Resilient RPC provider architecture and process-level error catching to prevent unexpected crashes.
* **Docker Support:** Fully containerized setup ready for cloud deployment.

---

## 🛠️ Tech Stack

* **Language:** TypeScript
* **Runtime:** Node.js
* **Blockchain Library:** Ethers.js v6
* **Database:** SQLite3
* **HTTP Client:** Axios
* **Containerization:** Docker & Docker Compose

---

## 📁 Project Structure

```text
ARC-MONITOR-TOOL/
├── data/                  # SQLite local database storage
├── dist/                  # Compiled JavaScript output
├── logs/                  # Persistent network activity logs
├── reports/               # Auto-generated markdown analytics reports
├── src/
│   ├── alerts.ts          # Smart threshold monitoring & Discord webhook engine
│   ├── database.ts        # SQLite database connection & schema manager
│   ├── monitor.ts         # Core real-time event listener & safety wrapper
│   ├── provider.ts        # Resilient network provider & auto-recovery
│   └── reporter.ts        # Metrics processor, report generator & orchestrator
├── .env                   # Configuration & RPC endpoint secrets
├── Dockerfile             # Container configuration
├── docker-compose.yml     # Multi-service orchestration
├── package.json           # Project dependencies & scripts
└── tsconfig.json          # TypeScript compilation configuration

```

---

## ⚙️ Installation & Setup

1. **Clone the repository:**
```bash
git clone [https://github.com/your-username/arc-monitor-tool.git](https://github.com/your-username/arc-monitor-tool.git)
cd arc-monitor-tool

```


2. **Install dependencies:**
```bash
npm install

```


3. **Configure environment variables:**
Create a `.env` file in the root directory and add your settings:
```env
ARC_RPC_URL=[https://rpc.testnet.arc.network](https://rpc.testnet.arc.network)
DISCORD_WEBHOOK_URL=your_discord_webhook_url_here

```



---

## 🚀 Running the Tool

### Option 1: Local Development

1. **Compile TypeScript files:**
```bash
npx tsc

```


2. **Start the monitor:**
```bash
node dist/monitor.js

```



### Option 2: Docker Deployment (Recommended)

Run the entire suite using Docker Compose:

```bash
docker-compose up --build -d

```

---

## 📄 License

This project is open-source and developed for hackathon demonstration purposes.

```

```
