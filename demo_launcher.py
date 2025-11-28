import subprocess
import time
import sys
import os
import webbrowser

def main():
    print("🚀 Launching NIRA-XT Guardian 2 Demo...")
    print("By Team X-CODERS")
    print("-" * 50)

    # Get absolute paths
    base_dir = os.path.dirname(os.path.abspath(__file__))
    backend_dir = os.path.join(base_dir, "backend")
    frontend_dir = os.path.join(base_dir, "frontend")

    # Start Backend
    print("Starting Backend (FastAPI)...")
    backend_process = subprocess.Popen(
        [sys.executable, "-m", "uvicorn", "app.main:app", "--reload"],
        cwd=backend_dir,
        shell=True
    )

    # Wait for backend to initialize
    time.sleep(3)

    # Start Frontend
    print("Starting Frontend (Vite)...")
    frontend_process = subprocess.Popen(
        ["npm", "run", "dev"],
        cwd=frontend_dir,
        shell=True
    )

    print("-" * 50)
    print("✅ System is running!")
    print("Backend: http://localhost:8000")
    print("Frontend: http://localhost:5173")
    print("Press Ctrl+C to stop all services.")

    # Open browser
    time.sleep(2)
    webbrowser.open("http://localhost:5173")

    try:
        backend_process.wait()
        frontend_process.wait()
    except KeyboardInterrupt:
        print("\n🛑 Stopping services...")
        backend_process.terminate()
        frontend_process.terminate()
        sys.exit(0)

if __name__ == "__main__":
    main()
