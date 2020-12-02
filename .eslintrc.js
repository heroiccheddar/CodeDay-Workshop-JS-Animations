module.exports = {
  extends: ['airbnb-typescript'],
  parserOptions: {
    project: ['./tsconfig.eslint.json'],
  },
  rules: {
    'import/prefer-default-export': 'off',
    'max-len': 'off',
    'no-console': 'off',
    'no-param-reassign': 'off',
    'react/static-property-placement': 'off',
    'no-plusplus': 'off',
  },
};
