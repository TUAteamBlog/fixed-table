module.exports = {
  extends: [
    'plugin:vue/essential',
  ],
  parserOptions: {
    parser: 'babel-eslint',
    sourceType: 'module',
  },
  plugins: [
    'vue',
  ],
  env: {
    jest: true,
  },
  rules: {
    'max-len': ['off', {
      code: 120,
      // for svg
      ignoreUrls: true,
    }],
    'no-param-reassign': ['error', {
      props: true,
      ignorePropertyModificationsFor: ['Vue'],
    }],
    'vue/no-mutating-props': 0,
  },
  globals: {},
};
