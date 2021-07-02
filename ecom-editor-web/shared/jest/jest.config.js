const path = require('path');

module.exports = {
  roots: ['./src/'],
  testMatch: ['**/?(*.)test.js?(x)'],
  collectCoverageFrom: ['src/**/*.{js,jsx}', '!src/**/*.stories.jsx'],
  coverageReporters: ['html', 'text', 'text-summary'],
  moduleNameMapper: {
    '\\.(css|scss)$': 'identity-obj-proxy',
    '^components': '<rootDir>/src/components',
  },
  moduleDirectories: ['node_modules', 'components', 'utilities'],
  snapshotSerializers: ['enzyme-to-json/serializer'],
  setupFiles: ['@babel/polyfill', path.resolve(__dirname, 'setupMocks.js')],
  setupFilesAfterEnv: [path.resolve(__dirname, 'setupEnzyme.js')],
};
