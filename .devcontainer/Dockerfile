FROM mcr.microsoft.com/devcontainers/javascript-node:1-18-bullseye

# Install additional tools and dependencies
RUN apt-get update && export DEBIAN_FRONTEND=noninteractive \
    && apt-get -y install --no-install-recommends \
        git \
        curl \
        wget \
        unzip \
        build-essential \
        python3 \
        python3-pip \
        openjdk-11-jdk \
    && apt-get autoremove -y && apt-get clean -y

# Install Expo CLI globally
RUN npm install -g @expo/cli

# Install Android SDK (for React Native development)
ENV ANDROID_HOME=/opt/android-sdk
ENV PATH=${PATH}:${ANDROID_HOME}/tools:${ANDROID_HOME}/platform-tools

# Create Android SDK directory
RUN mkdir -p ${ANDROID_HOME}

# Set up workspace
WORKDIR /workspace

# Expose ports for development servers
EXPOSE 3000 8000 8081 19000 19001 19002

# Set the default user
USER node
