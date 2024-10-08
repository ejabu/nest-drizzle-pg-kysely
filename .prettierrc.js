module.exports = {
  plugins: [
    '@ianvs/prettier-plugin-sort-imports',
    'prettier',
  ],
  singleQuote: true,
  trailingComma: 'all',
  tabWidth: 2,
  semi: true,
  arrowParens: 'always',
  endOfLine: 'lf',
  importOrder: [
    '^@nestjs',
    '<THIRD_PARTY_MODULES>',
    '',
    '',
    '^@(.*)$',
    '',
    '',
    '^types$',
    '',
    '^(.)/(.*)$',
    '',
    '^[./]',
    '',
    '^\\./[\\w\\-]+$',
    '',
    '^\\.\\?./',
    '',
  ],
  importOrderParserPlugins: ['typescript', 'jsx', 'decorators-legacy'],
};
