FROM node:20-bullseye

# Set working directory
WORKDIR /app

# Copy only package files first (better layer caching)
COPY package*.json ./

# Install dependencies
RUN npm ci

#Permissions for Allure results and report folders
RUN mkdir -p /app/allure-report /app/allure-results \
  && chown -R node:node /app/allure-report /app/allure-results

# Install Playwright browsers + system deps automatically
RUN npx playwright install --with-deps

# Install Java (needed for Allure CLI)
RUN apt-get update && apt-get install -y \
    openjdk-11-jre-headless \
    && rm -rf /var/lib/apt/lists/*

# Copy the rest of the app
COPY . .

# Expose results/report folders
VOLUME ["/app/allure-results", "/app/allure-report"]

# Default command
CMD ["npm", "run", "test"]

