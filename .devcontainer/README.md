# Festival Companion App - Development Container

This project includes a development container configuration that provides a consistent development environment using Docker.

## What's Included

- **Node.js 18** - For running Next.js and React Native/Expo applications
- **Expo CLI** - For React Native development
- **Git & GitHub CLI** - Version control tools
- **VS Code Extensions** - Pre-configured extensions for optimal development experience
- **Port Forwarding** - Automatic forwarding of development server ports

## Getting Started

### Prerequisites

- [Docker](https://www.docker.com/get-started)
- [Visual Studio Code](https://code.visualstudio.com/)
- [Dev Containers extension](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers)

### Using the Development Container

1. **Open in VS Code**: Open this project folder in VS Code
2. **Reopen in Container**: When prompted, click "Reopen in Container" or use the Command Palette (`Ctrl+Shift+P` / `Cmd+Shift+P`) and select "Dev Containers: Reopen in Container"
3. **Wait for Setup**: The container will build and install dependencies automatically
4. **Start Developing**: Once ready, you can run the development servers

### Available Ports

- **3000** - Next.js web application
- **8000** - General development server
- **8081** - Metro bundler (React Native)
- **19000** - Expo DevTools
- **19001** - Expo iOS simulator
- **19002** - Expo Android emulator

### Running the Applications

#### Next.js Web App
```bash
npm run dev
```

#### React Native/Expo Mobile App
```bash
cd mobile
npm start
```

### Features

- **Automatic dependency installation** on container creation
- **Pre-configured VS Code settings** for optimal development
- **Essential extensions** for TypeScript, Tailwind CSS, Prettier, ESLint, and Expo
- **Git integration** with GitHub CLI support
- **Port forwarding** for all development servers

### Troubleshooting

If you encounter issues:

1. **Rebuild Container**: Use Command Palette → "Dev Containers: Rebuild Container"
2. **Check Docker**: Ensure Docker is running and has sufficient resources
3. **Port Conflicts**: Make sure the required ports (3000, 8081, 19000-19002) are not in use

### Customization

You can modify the development container configuration by editing:
- `.devcontainer/devcontainer.json` - Main configuration
- `.devcontainer/Dockerfile` - Custom Docker setup
- `.devcontainer/docker-compose.yml` - Multi-service setup
