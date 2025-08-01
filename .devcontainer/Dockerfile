FROM mcr.microsoft.com/devcontainers/typescript-node:22

# Install pnpm
RUN npm install -g pnpm@latest

# Install tools and mongosh
RUN apt-get update && \
    apt-get install -y git curl wget gnupg && \
    curl -fsSL https://pgp.mongodb.com/server-6.0.asc | gpg --dearmor -o /usr/share/keyrings/mongodb.gpg && \
    echo "deb [arch=amd64,arm64 signed-by=/usr/share/keyrings/mongodb.gpg] https://repo.mongodb.org/apt/debian bullseye/mongodb-org/6.0 main" \
    | tee /etc/apt/sources.list.d/mongodb-org-6.0.list && \
    apt-get update && \
    apt-get install -y mongodb-mongosh && \
    rm -rf /var/lib/apt/lists/*

# Set working directory
WORKDIR /workspaces/splitter-app

# Copy package files if they exist (before switching to node user for caching)
COPY package*.json pnpm-lock.yaml* ./

# Use non-root user
USER node
