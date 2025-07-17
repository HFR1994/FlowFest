# Festival Companion App - Docker Setup

This document explains how to run the Festival Companion App using Docker.

## Prerequisites

- Docker installed on your system
- Docker Compose installed on your system

## Quick Start

### Option 1: Using Docker Compose (Recommended)

1. **Build and start the application:**
   ```bash
   docker-compose up --build
   ```

2. **Access the application:**
   - Web version: http://localhost:8081
   - Expo DevTools: http://localhost:19002

3. **Stop the application:**
   ```bash
   docker-compose down
   ```

### Option 2: Using Docker directly

1. **Build the Docker image:**
   ```bash
   docker build -t festival-app .
   ```

2. **Run the container:**
   ```bash
   docker run -p 8081:8081 -p 19000:19000 -p 19001:19001 -p 19002:19002 festival-app
   ```

## Available Ports

- **8081**: Expo web server (main application)
- **19000**: Expo development tools
- **19001**: Expo tunnel service
- **19002**: Metro bundler

## Features

The dockerized application includes:

- ✅ **Interactive Map**: React Leaflet integration for web, WebView for mobile
- ✅ **Festival Locations**: Stages, food vendors, facilities, and entrances
- ✅ **Real-time Updates**: Crowd levels and live information
- ✅ **Cross-platform**: Works on web browsers and mobile devices
- ✅ **Responsive Design**: Adapts to different screen sizes

## Development

### Hot Reloading

The Docker setup includes volume mounting for development:
- Changes to source code will trigger hot reloading
- No need to rebuild the container for code changes

### Logs

View application logs:
```bash
docker-compose logs -f festival-app
```

### Shell Access

Access the container shell for debugging:
```bash
docker-compose exec festival-app sh
```

## Production Deployment

For production deployment, consider:

1. **Environment Variables**: Set production-specific environment variables
2. **Build Optimization**: Use multi-stage builds for smaller images
3. **Security**: Remove development tools and dependencies
4. **Load Balancing**: Use reverse proxy (nginx) for multiple instances

## Troubleshooting

### Common Issues

1. **Port Already in Use**:
   ```bash
   # Check what's using the port
   lsof -i :8081
   # Kill the process or change the port in docker-compose.yml
   ```

2. **Permission Issues**:
   ```bash
   # On Linux/macOS, you might need to adjust file permissions
   sudo chown -R $USER:$USER .
   ```

3. **Container Won't Start**:
   ```bash
   # Check logs for detailed error information
   docker-compose logs festival-app
   ```

### Clean Rebuild

If you encounter issues, try a clean rebuild:
```bash
docker-compose down
docker-compose build --no-cache
docker-compose up
```

## Architecture

The application uses:
- **Frontend**: React Native with Expo
- **Web Support**: React Native Web
- **Maps**: React Leaflet (web) + WebView with Leaflet (mobile)
- **Styling**: React Native StyleSheet
- **Navigation**: React Navigation

## Support

For issues related to:
- Docker setup: Check this README and Docker logs
- Application features: Refer to the main application documentation
- Map functionality: Ensure internet connection for map tiles
