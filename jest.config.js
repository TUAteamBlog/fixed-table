module.exports = {
  verbose: false,
  testURL: 'http://localhost/',
  testEnvironment: 'jsdom',
  collectCoverage: true,
  collectCoverageFrom: ['src/**'],
  coveragePathIgnorePatterns: ['/__snapshots__/'],
  transform: {
    '^.+\\.vue$': 'vue-jest',
    '^.+\\.jsx?$': 'babel-jest',
    '.+\\.(css|styl|less|sass|scss|svg|png|jpg|gif|ttf|woff|woff2)$': 'jest-transform-stub',
  },
  transformIgnorePatterns: [
    'node_modules/(?!(swiper|dayjs)/)',
  ],
  moduleNameMapper: {
    '@/(.*)$': '<rootDir>/src/$1',
    '@docs/(.*)$': '<rootDir>/docs/$1',
    '\\.(jpg|jpeg|png)$': '<rootDir>/imageMock.js',
  },
  moduleFileExtensions: ['js', 'vue'],
  snapshotSerializers: [
    'jest-serializer-vue',
  ],
};
