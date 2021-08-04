module.exports = {
  env: {
    browser: true,
    node: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended"
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 12,
    sourceType: "module",
  },
  plugins: [
    "@typescript-eslint"
  ],
  rules: {}
};
// extends: chartjs

// parserOptions:
//   ecmaVersion: 2015
//   sourceType: module

// env:
//   browser: true
//   node: true
