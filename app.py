import os
import sys

# Ensure backend directory is in Python search path
base_dir = os.path.dirname(os.path.abspath(__file__))
backend_dir = os.path.join(base_dir, "backend")
if backend_dir not in sys.path:
    sys.path.insert(0, backend_dir)

import uvicorn
from api.main import app

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 7860))
    print(f"Starting Biblio AI VinUni on port {port}...")
    uvicorn.run(app, host="0.0.0.0", port=port)
