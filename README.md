# NIRA-XT Guardian 2

NIRA-XT Guardian 2 is a comprehensive DNS-level parental control and threat protection system. It features a modern React frontend and a powerful FastAPI backend with a custom DNS server.

## 🚀 Features
- **Real-time DNS Filtering**: Blocks malware, phishing, and ads at the DNS level.
- **Modern Dashboard**: Beautiful, responsive UI built with React, Vite, and Shadcn/UI.
- **Threat Intelligence**: Integrated with threat feeds to block malicious domains.
- **Device Management**: Manage and monitor devices on your network.

## 🛠️ Tech Stack
- **Frontend**: React, Vite, TailwindCSS, Shadcn/UI, Recharts
- **Backend**: FastAPI, Python, DNSPython
- **Database**: In-memory (Demo) / SQLite (Production ready)

## 📦 Installation

### Prerequisites
- Python 3.10+
- Node.js 18+
- npm

### Local Development

1.  **Clone the repository**
    ```bash
    git clone <repository-url>
    cd NIRA-XT_Guardian_2
    ```

2.  **Run the Demo Launcher** (Easiest way)
    ```bash
    python demo_launcher.py
    ```
    This will start both the backend and frontend automatically.

### Manual Setup

**Backend**
```bash
cd backend
pip install -r requirements.txt
uvicorn app.main:app --reload
```

**Frontend**
```bash
cd frontend
npm install
npm run dev
```

## 🌍 Deployment (Unified)

The application is configured to run as a **Single Docker Container**. This simplifies deployment to any platform (VPS, Render, Railway, etc.).

### Option 1: Docker (Recommended)
1.  Build and run the container:
    ```bash
    docker-compose up --build -d
    ```
2.  The application will be available at `http://localhost:8000`.
    -   **Dashboard**: `http://localhost:8000`
    -   **API Docs**: `http://localhost:8000/api/v1/docs`
    -   **DNS Server**: Port 53 (UDP)

### Option 2: VPS / Cloud
1.  Copy the repository to your server.
2.  Run `docker-compose up --build -d`.
3.  Configure your router or devices to use your VPS IP address as the DNS server.

## 🛡️ DNS Configuration
To use the filtering, configure your device's DNS settings to point to the IP address where the backend is running.
- **Localhost**: `127.0.0.1`
- **VPS**: `<Your-VPS-IP>`

## 📄 License
MIT
