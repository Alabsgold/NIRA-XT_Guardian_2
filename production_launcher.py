import os
import shutil
import subprocess
import sys
import time
import webbrowser

def run_command(command, cwd=None, shell=True):
    print(f"Running: {command}")
    result = subprocess.run(command, cwd=cwd, shell=shell)
    if result.returncode != 0:
        print(f"Error executing {command}")
        sys.exit(1)

def main():
    print("Starting NIRA-XT Guardian 2 (Production Mode)...")
    
    base_dir = os.path.dirname(os.path.abspath(__file__))
    frontend_dir = os.path.join(base_dir, "frontend")
    backend_dir = os.path.join(base_dir, "backend")
    static_dir = os.path.join(backend_dir, "app", "static")

    # 1. Build Frontend
    print("\nBuilding Frontend...")
    run_command("npm run build", cwd=frontend_dir)

    # 2. Copy Assets
    print("\nDeploying Assets...")
    if os.path.exists(static_dir):
        shutil.rmtree(static_dir)
    
    dist_dir = os.path.join(frontend_dir, "dist")
    shutil.copytree(dist_dir, static_dir)
    print(f"Assets copied to {static_dir}")

    # 3. Start Backend
    print("\nStarting Backend Server...")
    print("The application will be available at http://localhost:8000")
    print("Press Ctrl+C to stop.")
    
    # Open browser after a slight delay
    def open_browser():
        time.sleep(2)
        webbrowser.open("http://localhost:8000")
    
    import threading
    threading.Thread(target=open_browser).start()

    # Run Uvicorn directly
    # We use sys.executable to ensure we use the same python environment
    subprocess.run(
        [sys.executable, "-m", "uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"],
        cwd=backend_dir
    )

if __name__ == "__main__":
    main()
