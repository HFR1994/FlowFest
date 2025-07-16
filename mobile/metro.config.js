const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Add web-specific resolver configurations
config.resolver.platforms = ['ios', 'android', 'native', 'web'];

// Ensure proper module resolution for web
config.resolver.alias = {
  'react-native$': 'react-native-web',
};

// Add support for additional file extensions
config.resolver.sourceExts.push('web.js', 'web.ts', 'web.tsx');

module.exports = config;
