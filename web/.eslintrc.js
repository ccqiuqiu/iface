module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/essential',
    '@vue/standard'
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'comma-dangle': 0,
    'no-mixed-operators': 0,
    'object-curly-spacing': 0,
  },
  parserOptions: {
    parser: 'babel-eslint',
    // ecmaFeatures: { // 解决 Using the export keyword between a decorator and a class is not allowed. Please use `export @dec class` instead.
    //   legacyDecorators: true,
    //   experimentalObjectRestSpread: true,
    // }
  }
}
