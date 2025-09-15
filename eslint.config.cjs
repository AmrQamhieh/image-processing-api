// ESLint v9+ flat config in **CommonJS** form
const tsParser = require('@typescript-eslint/parser');
const tsPlugin = require('@typescript-eslint/eslint-plugin');

module.exports = [
  // Global ignores
  {
    ignores: ['dist/**', 'assets/cache/**', 'node_modules/**'],
  },

  // Lint our TS files
  {
    files: ['src/**/*.ts', 'tests/**/*.ts'],
    languageOptions: {
      parser: tsParser,
      parserOptions: { sourceType: 'module', ecmaVersion: 'latest' },
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
    },
    rules: {
      // minimal, sensible rules
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
    },
  },
];
