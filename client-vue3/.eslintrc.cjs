/*
 * @Author: master
 * @Date: 2022-03-28 13:40:37
 * @LastEditTime: 2022-08-13
 * @Description: 代码检测
 */
module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    commonjs: true,
    es6: true,
    'vue/setup-compiler-macros': true,
  },
  globals: {
    viteConfig: 'readonly', // 配置多级目录访问地址’
    JSX: 'readonly',
  },
  plugins: ['@typescript-eslint'], // Prettier will be automatically injected by plugin:prettier/recommended
  settings: {},
  rules: {
    'no-new': 'off',
    'no-debugger': 'warn',
    'no-var': 'error',
    'import/no-absolute-path': 'off', // 绝对路径异常关闭
    'vue/script-setup-uses-vars': 1,
    '@typescript-eslint/no-unused-vars': ['error'],
  },
  parser: 'vue-eslint-parser',
  parserOptions: {
    // Parser that checks the content of the <script> tag
    parser: '@typescript-eslint/parser',
    sourceType: 'module',
    ecmaVersion: 2020,
    ecmaFeatures: {
      jsx: true,
    },
  },
  // extends eslint config
  extends: [
    'eslint-config-standard',
    'plugin:eslint-plugin-prettier/recommended', // integrate eslint-plugin-prettier with eslint-config-prettier
    'plugin:eslint-plugin-vue/essential',
  ],
};
