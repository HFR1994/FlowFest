# Use Node.js 18 as base image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Install Expo CLI globally
RUN npm install -g @expo/cli

# Copy package.json files
COPY package.json ./
COPY mobile/package.json ./mobile/

# Install root dependencies
RUN npm install

# Install mobile dependencies
WORKDIR /app/mobile
RUN npm install

# Copy all source code
WORKDIR /app
COPY . .

# Expose port for Expo dev server
EXPOSE 8081
EXPOSE 19000
EXPOSE 19001
EXPOSE 19002

# Set working directory to mobile for Expo commands
WORKDIR /app/mobile

# Start Expo development server
CMD ["npx", "expo", "start", "--web", "--host", "0.0.0.0", "--port", "8081"]
