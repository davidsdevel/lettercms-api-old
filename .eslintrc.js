module.exports = {
  env: {
    browser: false,
    commonjs: true,
    es6: false,
    node: true,
  },
  extends: [
    'eslint:recommended'
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  ignorePatterns: ['testing/*'],
  parserOptions: {
    sourceType: 'module',
    ecmaFeatures: {
      jsx: false,
    },
    ecmaVersion: 11,
  },
  rules: {
    'semi': ['error', 'always'],
    'quotes': ['error', 'single'],
    'array-bracket-spacing': 'error',
    'arrow-spacing': 'error',
    complexity: 'error',
    curly: 'off',
    'no-buffer-constructor': 'error',
    'no-var': 'error'
  }
};
