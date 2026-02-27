# Run with Docker

Build the production image and run:

```powershell
docker build -t portfolio-svelte:latest .
docker run --rm -p 8080:80 portfolio-svelte:latest
```

Then open http://localhost:8080

Or using docker-compose:

```powershell
docker compose up --build
```

Notes:
- This Dockerfile runs `npm run build` (SvelteKit adapter-static outputs `build/`).
- The built static site is served by nginx.
