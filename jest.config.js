const { pathsToModuleNameMapper } = require('ts-jest/utils');

const { name } = require('./package.json');
const { compilerOptions } = require('./tsconfig.json');

module.exports = {
  displayName: name,
  name,
  clearMocks: true,
  preset: 'ts-jest',
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: '<rootDir>/src/',
  }),
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
  setupFiles: ['<rootDir>/src/shared/tests/setupTests.ts'],
};
