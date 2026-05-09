import eslintJs from '@eslint/js';
import eslintTs from 'typescript-eslint';
import eslintAstro from 'eslint-plugin-astro';
import astroParser from 'astro-eslint-parser';
import tsParser from '@typescript-eslint/parser';

export default [
  eslintJs.configs.recommended,
  ...eslintTs.configs.recommended,
  ...eslintAstro.configs.recommended,
  {
    files: ['**/*.astro'],
    languageOptions: {
      parser: astroParser,
      parserOptions: {
        parser: tsParser,
        extraFileExtensions: ['.astro'],
      },
    },
  },
  {
    files: ['**/*.ts'],
    languageOptions: {
      parser: tsParser,
    },
  },
  {
    rules: {
      'no-console': 'warn',
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
        },
      ],
    },
  },
];
