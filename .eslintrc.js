module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
  },
  extends: 'airbnb-base',
  overrides: [
  ],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  settings: {
    "import/resolver": {
      "node": {
        "extensions": [
          ".js",
          ".jsx",
          ".mjs"
        ]
      }
    }
  },
  rules: {
    'no-plusplus': 'off',
    eqeqeq: 'off',
    'no-restricted-globals': 'off',
    'prefer-destructuring': 'off',
    'no-alert': 'off',
  },
  ignorePatterns: ['*.test.*', 'documentation/*'],
};
