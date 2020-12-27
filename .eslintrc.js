/**
 * @type {import('eslint').Linter.Config}
 */
const config = {
  parser: `vue-eslint-parser`,
  parserOptions: {
    parser: '@typescript-eslint/parser',
    project: './tsconfig.json',
    extraFileExtensions: ['.vue'],
  },
  extends: [
    'plugin:vue/vue3-essential',
    // 'plugin:vue/vue3-strongly-recommended',
    // 'plugin:vue/vue3-recommended',
    'airbnb-typescript/base',
  ],
  plugins: ['vue', 'prettier'],
  rules: {
    'prettier/prettier': 'warn',
  },
};

module.exports = config;
