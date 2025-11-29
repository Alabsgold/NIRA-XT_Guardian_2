# NIRA-XT Guardian 2

NIRA-XT Guardian 2 is a comprehensive DNS-level parental control and threat protection system. It features a modern React frontend and a powerful FastAPI backend with a custom DNS server.

## 🚀 Features
- **Real-time DNS Filtering**: Blocks malware, phishing, and ads at the DNS level.
- **Modern Dashboard**: Beautiful, responsive UI built with React, Vite, and Shadcn/UI.
- **Threat Intelligence**: Integrated with threat feeds to block malicious domains.
- **Device Management**: Manage and monitor devices on your network.

## �️ Tech Stack
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

## 🌍 Deployment

### Frontend (Vercel)
The frontend is optimized for deployment on Vercel.

1.  Push your code to GitHub/GitLab/Bitbucket.
2.  Import the project into Vercel.
3.  Select the `frontend` directory as the **Root Directory**.
4.  Vercel should automatically detect Vite.
5.  Click **Deploy**.

### Backend (Docker / VPS)
**Note**: The backend requires a persistent process to run the DNS server (UDP Port 53). It **cannot** be deployed on Vercel Serverless Functions.

**Option 1: Docker (Recommended)**
1.  Build the image:
    ```bash
    docker-compose up --build -d
    ```
2.  The backend will be available at `http://localhost:8000` and DNS on port 53.

**Option 2: Render / Railway / Fly.io**
1.  Connect your repository.
2.  Set the **Root Directory** to `backend`.
3.  Set the **Build Command** to: `pip install -r requirements.txt`
4.  Set the **Start Command** to: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`
5.  **Important**: Most PaaS free tiers (like Render) do not support UDP ports (DNS). You may need a VPS (DigitalOcean, AWS EC2, Hetzner) to run the actual DNS server component publicly.
    *   For a VPS, simply use the `docker-compose.yml` provided.

## 🛡️ DNS Configuration
To use the filtering, configure your device's DNS settings to point to the IP address where the backend is running.
- **Localhost**: `127.0.0.1`
- **VPS**: `<Your-VPS-IP>`

## 📄 License
MIT
