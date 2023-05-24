module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: 'airbnb-base',
  overrides: [
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    "no-async-promise-executor" : "off",
    "no-restricted-syntax": "off",
    "no-continue" : "off",
    "no-await-in-loop" : "off",
    "no-param-reassign" : "off",
    "camelcase" : "off",
    "no-plusplus" : "off",
  },
};
