# NIRA-XT Guardian 2 🛡️

> **Next-Gen DNS-Level Threat Protection & Parental Control System**
> *Built for the NKF NIRA-XT Hackathon II*

NIRA-XT Guardian 2 is an advanced, AI-powered DNS filtering solution designed to protect families and organizations from digital threats. Unlike traditional blockers, it uses **Google Gemini AI** to analyze domain reputation in real-time, offering proactive protection against zero-day phishing sites, malware, and inappropriate content.

---

## 🚀 Key Features

### 🧠 AI-Powered Threat Analysis
- **Deep Content Inspection**: Uses Google Gemini to analyze unknown domains in real-time.
- **Reputation Scoring**: Assigns risk scores (0-100) to domains based on patterns and history.
- **Smart Blocking**: Automatically blocks high-risk domains that aren't yet on static blocklists.

### ⚡ Seamless Device Connection
- **Auto-Connect Agent (Windows)**: A one-click PowerShell agent that automatically links your IP and configures system DNS.
- **Mobile Support**: Easy-to-follow guides for connecting Android and iOS devices.
- **Multi-Tenancy**: Supports multiple users with isolated dashboards and device logs.

### 📊 Real-Time Analytics
- **Live Query Stream**: Watch DNS queries happen in real-time via WebSockets.
- **Threat Visualizations**: Interactive charts showing blocked threats, query volume, and top domains.
- **Device Insights**: Track usage per device (Laptop, Phone, Tablet).

### 🛠️ Advanced Architecture
- **Custom DNS Server**: Built with Python (`dnspython`) to intercept and filter UDP traffic on Port 53.
- **Split-Stack Design**:
    - **Backend**: FastAPI (High-performance, Async) + SQLite.
    - **Frontend**: React + Vite + TailwindCSS + Shadcn/UI (Modern, Responsive).

---

## 📦 Installation & Setup

### Option 1: Quick Start (Local)
The easiest way to run the full system locally.

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/Alabsgold/NIRA-XT_Guardian_2.git
    cd NIRA-XT_Guardian_2
    ```
2.  **Run the Launcher**:
    ```bash
    python production_launcher.py
    ```
    *This script automatically installs dependencies, builds the frontend, and starts the backend.*

3.  **Access the Dashboard**:
    Open `http://localhost:8000` in your browser.

### Option 2: Replit (Cloud Demo)
Click the "Run on Replit" button or import this repo.
*   **Note**: Replit blocks Port 53 (DNS). The Dashboard and API will work, but the DNS server will only be accessible internally.

### Option 3: Docker (Production)
Deploy as a single container.
```bash
docker-compose up --build -d
```

---

## 🎮 How to Use

### 1. Connect Your Device
*   **Automatic (PC)**:
    1.  Log in to the Dashboard.
    2.  Click **"Connect New Device"**.
    3.  Click **"Download Agent (.ps1)"**.
    4.  Run the script to automatically link your IP and set your DNS.
*   **Manual (Mobile)**:
    1.  Click **"Connect New Device"** -> **"Mobile / Other"**.
    2.  Enter the displayed IP address into your phone's Wi-Fi DNS settings.

### 2. Monitor & Protect
*   Go to the **Dashboard** to see live stats.
*   Try visiting a blocked domain (e.g., `example-phishing.com`) to see the AI blocker in action.

---

## 🔮 Future Roadmap
- [ ] **Mobile App**: Native iOS/Android app for one-tap VPN configuration.
- [ ] **Granular Policies**: Set different blocking rules for "Kids" vs "Adults".
- [ ] **Enterprise LDAP**: Integrate with Active Directory for corporate use.

---

## 📄 License
MIT License.

**Team X-CODERS**
*Built with ❤️ for a safer Nigerian Internet.*
