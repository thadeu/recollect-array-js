module.exports = {
  bail: true,
  forceExit: true,
  clearMocks: true,
  collectCoverage: false,
  transform: { '.(js|jsx|ts|tsx)': '@sucrase/jest-plugin' },
  moduleNameMapper: {
    '@/(.*)$': '<rootDir>/src/$1',
  },
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100,
    },
  },
  testTimeout: 10000,
}
