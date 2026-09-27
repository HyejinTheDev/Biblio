import os
import sys

# Support for Hugging Face ZeroGPU if ZeroGPU hardware tier was selected
try:
    import spaces

    @spaces.GPU
    def _zerogpu_keepalive():
        return True

    _zerogpu_keepalive()
except Exception:
    pass

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
