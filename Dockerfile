# -------------------------------
# Custom Dockerfile for Playwright + Allure
# -------------------------------

FROM node:20-bullseye

# # Set the working directory inside the container
WORKDIR /app
 
# # Copy your application code into the container
COPY . /app

# Install OS dependencies + Java (for Allure) + Playwright dependencies
RUN apt-get update && apt-get install -y \
    openjdk-11-jre-headless \
    libnss3 \
    libatk1.0-0 \
    libatk-bridge2.0-0 \
    libcups2 \
    libdrm2 \
    libxkbcommon0 \
    libxcomposite1 \
    libxdamage1 \
    libxrandr2 \
    libgbm1 \
    libpango-1.0-0 \
    libasound2 \
    curl \
    wget \
    unzip \
    && rm -rf /var/lib/apt/lists/* 
    
# Set environment variables or additional configuration if needed
ENV JAVA_HOME=/usr/lib/jvm/java-11-openjdk-amd64

# # Copy package files and install dependencies
# COPY package*.json ./
# RUN npm install

# # # Set the working directory inside the container
# WORKDIR /app
 
# # # Copy your application code into the container
# COPY . /app

# Install Playwright browsers
RUN npm install\
    && npx playwright install --force --with-deps

# Install Allure CLI globally
RUN npm install -g allure-commandline --save-dev

# Expose test-results folder
# VOLUME ["/app/allure-results", "/app/allure-report"]

# Default command: run tests and generate Allure reports
CMD npm run test


# # Use the Playwright image as the base image
# FROM mcr.microsoft.com/playwright:v1.55.0-noble
 
# # Set the working directory inside the container
# WORKDIR /app
 
# # Copy your application code into the container
# COPY . /app
 
# # Install Java and other dependencies
# RUN apt-get update && \
#     apt-get install -y openjdk-11-jre-headless && \
#     npm install
 
# # Set environment variables or additional configuration if needed
# ENV JAVA_HOME=/usr/lib/jvm/java-11-openjdk-amd64
 
# # Command to run your Playwright tests
# CMD ["npm", "test"]