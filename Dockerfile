# Base image
FROM node:20-bullseye

# Set working directory
WORKDIR /app

# Install Java 17 for Allure
RUN apt-get update && \
    apt-get install -y openjdk-17-jdk && \
    rm -rf /var/lib/apt/lists/*

RUN mkdir -p /app/allure-report /app/allure-results && \
    chmod -R 777 /app/allure-report /app/allure-results

# Set JAVA_HOME for Allure CLI
ENV JAVA_HOME=/usr/lib/jvm/java-17-openjdk-amd64
ENV PATH="$JAVA_HOME/bin:$PATH:$PATH"

# Copy package.json and package-lock.json first (for caching)
COPY package*.json ./

# Install dependencies
RUN npm ci

# Install Playwright browsers
RUN npx playwright install --with-deps

# Copy the rest of the app
COPY . .

# Make scripts executable if needed
RUN chmod +x ./scripts/run-tests.sh

# Default command to run tests
CMD ["npm", "run", "test"]