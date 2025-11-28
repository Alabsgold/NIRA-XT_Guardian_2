# NIRA-XT Guardian 2 - Build & Run Guide

## Prerequisites
- Node.js (v18+)
- Python (v3.9+)
- pip

## Installation

### 1. Backend Setup
Navigate to the `backend` directory and install dependencies:
```bash
cd backend
pip install -r requirements.txt
```

### 2. Frontend Setup
Navigate to the `frontend` directory and install dependencies:
```bash
cd frontend
npm install
```

## Running the Application

### Option A: Demo Launcher (Recommended)
We have provided a convenient script to launch both backend and frontend simultaneously.
From the root directory:
```bash
python demo_launcher.py
```

### Option B: Manual Start

**Terminal 1 (Backend):**
```bash
cd backend
uvicorn app.main:app --reload
```
The backend will start at `http://localhost:8000`.

**Terminal 2 (Frontend):**
```bash
cd frontend
npm run dev
```
The frontend will start at `http://localhost:5173`.

## Building for Production

### Frontend
```bash
cd frontend
npm run build
```
The build artifacts will be in `frontend/dist`.

### Backend
The backend is ready to run with any ASGI server (e.g., gunicorn, uvicorn).
