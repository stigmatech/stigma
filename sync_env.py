import os
import subprocess

env_file = ".env.local"
skip = ["VERCEL_OIDC_TOKEN", "NEXT_PUBLIC_SUPABASE_ANON_KEY", "NEXT_PUBLIC_SUPABASE_URL"]

# Helper to find Node/NPM if PATH is weird
PATH_OVERRIDE = "/usr/local/bin:/usr/bin:/bin"

with open(env_file, "r") as f:
    for line in f:
        line = line.strip()
        if not line or line.startswith("#"):
            continue
        
        if "=" in line:
            key, value = line.split("=", 1)
            key = key.strip()
            value = value.strip().strip("\"").strip("'")
            
            if key in skip:
                continue
                
            print(f"Adding {key}...")
            # Target both production and preview
            for env_type in ["production", "preview"]:
                subprocess.run(
                    ["/usr/local/bin/npx", "vercel", "env", "add", key, env_type, "--value", value, "--yes", "--non-interactive"],
                    env={**os.environ, "PATH": PATH_OVERRIDE},
                    check=False
                )
