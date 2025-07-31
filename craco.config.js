module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      // Ignore source map warnings for MediaPipe packages
      webpackConfig.ignoreWarnings = [
        /Failed to parse source map/,
        /Module Warning/,
        /@mediapipe/
      ];
      
      return webpackConfig;
    },
  },
}; 