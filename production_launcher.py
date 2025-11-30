import subprocess
import time
import os
import signal
import sys
import psutil
import webbrowser
import shutil

def kill_process_on_port(port):
    """Finds and kills the process listening on the specified port."""
    print(f"Checking port {port}...")
    for proc in psutil.process_iter(['pid', 'name']):
        try:
            for conn in proc.connections(kind='inet'):
                if conn.laddr.port == port:
                    print(f"  KILLING process {proc.info['name']} (PID: {proc.info['pid']}) on port {port}...")
                    proc.kill()
                    return
        except (psutil.NoSuchProcess, psutil.AccessDenied, psutil.ZombieProcess):
            pass

def run_command(command, cwd=None, env=None):
    """Runs a command and prints its output in real-time."""
    print(f"Running: {command}")
    process = subprocess.Popen(
        command,
        shell=True,
        stdout=sys.stdout,
        stderr=sys.stderr,
        cwd=cwd,
        env=env
    )
    return process

def main():
    print("Starting NIRA-XT Guardian 2 (Production Mode)...")

    # 1. Kill any existing processes on ports 8000, 53, 5353
    print("\n[1/4] Cleaning up ports...")
    kill_process_on_port(8000)
    kill_process_on_port(53)
    kill_process_on_port(5353)
    time.sleep(2) # Wait for ports to free up

    base_dir = os.path.dirname(os.path.abspath(__file__))
    frontend_dir = os.path.join(base_dir, "frontend")
    backend_dir = os.path.join(base_dir, "backend")
    static_dir = os.path.join(backend_dir, "app", "static")

    # 2. Build Frontend
    print("\n[2/4] Building Frontend...")
    if run_command("npm run build", cwd=frontend_dir).wait() != 0:
        print("Frontend build failed!")
        sys.exit(1)

    # 3. Copy Assets
    print("\n[3/4] Deploying Assets...")
    if os.path.exists(static_dir):
        shutil.rmtree(static_dir)
    
    dist_dir = os.path.join(frontend_dir, "dist")
    if os.path.exists(dist_dir):
        shutil.copytree(dist_dir, static_dir)
        print(f"Assets copied to {static_dir}")
    else:
        print("Warning: dist directory not found. Skipping asset copy.")

    # 4. Start Backend (which also serves Frontend & DNS)
    print("\n[4/4] Starting Backend & DNS Server...")
    
    # Set environment variables for production
    env = os.environ.copy()
    env["PYTHONPATH"] = backend_dir
    
    # Open browser after a slight delay
    def open_browser():
        time.sleep(5)
        webbrowser.open("http://localhost:8000")
    
    import threading
    threading.Thread(target=open_browser).start()
    
    # Run uvicorn directly
    cmd = "uvicorn app.main:app --host 0.0.0.0 --port 8000"
    try:
        process = run_command(cmd, cwd=backend_dir, env=env)
        process.wait()
    except KeyboardInterrupt:
        print("\nStopping services...")
        process.terminate()

if __name__ == "__main__":
    main()
