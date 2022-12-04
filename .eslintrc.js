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
  rules: {
    'no-plusplus': 'off',
    eqeqeq: 'off',
    'no-restricted-globals': 'off',
    'prefer-destructuring': 'off',
    'no-alert': 'off',
    'import/extensions': [
      'error', 
      'always', 
      {
        'js': 'never',
        'mjs': 'never'
      }
    ]
  },
  ignorePatterns: ['*.test.*', 'documentation/*'],
};
