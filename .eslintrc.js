const {NODE_ENV} = process.env
module.exports = {
    root: true,
    env: {
        node: true
    },
    extends: [
      'plugin:vue/essential', '@vue/standard'
    ],
    parserOptions: {
        parser: 'babel-eslint'
    },
    rules: {
      'no-console': 'off',
      'no-debugger': NODE_ENV === 'production' ? 'warn' : 'off',
      'dot-notation': 0,
      'space-before-function-paren': 0,
      'no-undef': 0,
      'object-curly-spacing': 0,
      'comma-dangle': 0
    },
    overrides: [
      {
        files: [
          '**/__tests__/*.{j,t}s?(x)',
          '**/tests/unit/**/*.spec.{j,t}s?(x)'
        ],
        env: {
          jest: true
        }
      }
    ]
}
