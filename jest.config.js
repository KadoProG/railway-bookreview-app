module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jest-environment-jsdom',
  transform: {
    '^.+\\.(js|jsx|mjs)?$': ['babel-jest'],
    '^.+\\.(ts|tsx)$': 'ts-jest',
    '^.+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$':
      'jest-transform-stub',
  },
  transformIgnorePatterns: ['/node_modules/(?!(xxxx.*?\\.js$))'],
  testRegex: '(/test/.*|\\.(test|spec))\\.(ts|tsx|js)$',
  testPathIgnorePatterns: ['/node_modules/'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'json'],
  moduleNameMapper: {
    '\\.(jpg|ico|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/__mocks__/fileMock.js',
    '\\.(css|scss)$': '<rootDir>/__tests__/*.test.tsx',
    '/.(css|less|scss|sss|styl)$/':
      '/Users/kadoblog/Documents/techTrain/railway-bookreview-app/node_modules/jest-css-modules',
  },
  testURL: 'https://example.koko.jp',
}
