# Stage 1: Build Frontend
FROM node:18-alpine as frontend-build
WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm install
COPY frontend/ .
RUN npm run build

# Stage 2: Build Backend & Serve
FROM python:3.10-slim
WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y --no-install-recommends \
    gcc \
    && rm -rf /var/lib/apt/lists/*

# Copy backend requirements
COPY backend/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy backend code
COPY backend/ .

# Copy built frontend assets to backend's static folder
# We place them in app/static so main.py can find them
COPY --from=frontend-build /app/frontend/dist /app/app/static

# Expose ports
EXPOSE 8000
EXPOSE 53/udp
EXPOSE 5353/udp

# Environment variables
ENV MODULE_NAME=app.main
ENV VARIABLE_NAME=app
ENV PORT=8000

# Run the application
CMD sh -c "uvicorn app.main:app --host 0.0.0.0 --port ${PORT:-8000}"
