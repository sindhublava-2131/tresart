#!/usr/bin/env python3
"""
TresArt Dev Server Launcher
Starts backend (FastAPI) and frontend (Vite/React) simultaneously.
Press Ctrl+C to stop both servers.
"""

import subprocess
import threading
import sys
import os
import signal
import io
import socket

# Force UTF-8 output on Windows
if sys.platform == "win32":
    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8", errors="replace")
    sys.stderr = io.TextIOWrapper(sys.stderr.buffer, encoding="utf-8", errors="replace")

# ── Config ────────────────────────────────────────────────────────────────────
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
FASTAPI_DIR = os.path.join(BASE_DIR, "backend", "fastapi_app")
VENV_PYTHON = os.path.join(
    FASTAPI_DIR,
    "Scripts" if sys.platform == "win32" else "bin",
    "python.exe" if sys.platform == "win32" else "python",
)
BACKEND_PYTHON = VENV_PYTHON if os.path.isfile(VENV_PYTHON) else sys.executable

SERVICES = [
    {
        "name": "BACKEND ",
        "cwd": FASTAPI_DIR,
        "cmd": [BACKEND_PYTHON, "-m", "uvicorn", "app.main:app", "--host", "127.0.0.1", "--port", "5000", "--reload"],
        "color": "\033[94m",   # Blue
        "shell": False,
    },
    {
        "name": "FRONTEND",
        "cwd": os.path.join(BASE_DIR, "frontend"),
        "cmd": ["npm", "run", "dev"],
        "color": "\033[92m",   # Green
        "shell": sys.platform == "win32",
    },
]

RESET  = "\033[0m"
BOLD   = "\033[1m"
RED    = "\033[91m"
YELLOW = "\033[93m"

processes: list[subprocess.Popen] = []
lock = threading.Lock()


# ── Helpers ───────────────────────────────────────────────────────────────────
def prefix(service: dict) -> str:
    return f"{BOLD}{service['color']}[{service['name']}]{RESET} "


def stream_output(proc: subprocess.Popen, service: dict) -> None:
    """Read stdout/stderr and print with colored prefix."""
    pfx = prefix(service)
    try:
        for line in iter(proc.stdout.readline, b""):
            text = line.decode("utf-8", errors="replace").rstrip()
            if text:
                print(f"{pfx}{text}", flush=True)
    except Exception:
        pass


def run_service(service: dict) -> None:
    """Spawn a service and register it for cleanup."""
    pfx = prefix(service)
    print(f"{pfx}{YELLOW}Starting…{RESET}", flush=True)

    try:
        proc = subprocess.Popen(
            service["cmd"],
            cwd=service["cwd"],
            stdout=subprocess.PIPE,
            stderr=subprocess.STDOUT,
            # npm.cmd needs cmd on Windows; the Python executable does not.
            shell=service["shell"],
        )
    except FileNotFoundError:
        print(f"{pfx}{RED}Error: configured runtime command was not found.{RESET}")
        return

    with lock:
        processes.append(proc)

    stream_output(proc, service)

    ret = proc.wait()
    if ret != 0:
        print(f"{pfx}{RED}Exited with code {ret}{RESET}", flush=True)
    else:
        print(f"{pfx}Stopped.", flush=True)


def port_in_use(port: int) -> bool:
    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as sock:
        sock.settimeout(0.5)
        return sock.connect_ex(("127.0.0.1", port)) == 0


def shutdown(signum=None, frame=None) -> None:
    print(f"\n{BOLD}{YELLOW}Shutting down all services…{RESET}", flush=True)
    with lock:
        for proc in processes:
            try:
                if sys.platform == "win32":
                    proc.send_signal(signal.CTRL_C_EVENT)
                else:
                    proc.terminate()
            except Exception:
                pass
    sys.exit(0)


# ── Entry point ───────────────────────────────────────────────────────────────
if __name__ == "__main__":
    signal.signal(signal.SIGINT,  shutdown)
    signal.signal(signal.SIGTERM, shutdown)

    print(f"\n{BOLD}*** TresArt Dev Launcher ***{RESET}")
    print(f"{'─' * 40}")
    print(f"  Backend  → {SERVICES[0]['cwd']}")
    print(f"  Frontend → {SERVICES[1]['cwd']}")
    print(f"{'─' * 40}")
    print(f"  Press {BOLD}Ctrl+C{RESET} to stop all servers\n")

    if port_in_use(5000):
        print(f"{BOLD}{YELLOW}Port 5000 is already in use; keeping the existing backend running and starting only the frontend.{RESET}")
        SERVICES = [svc for svc in SERVICES if svc["name"] != "BACKEND "]

    threads = []
    for svc in SERVICES:
        t = threading.Thread(target=run_service, args=(svc,), daemon=True)
        t.start()
        threads.append(t)

    try:
        for t in threads:
            t.join()
    except KeyboardInterrupt:
        shutdown()
