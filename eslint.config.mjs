import globals from 'globals';
import tseslint from 'typescript-eslint';
import pluginReact from 'eslint-plugin-react';
import js from '@eslint/js';
import ts from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import importPlugin from 'eslint-plugin-import';
import prettier from 'eslint-plugin-prettier';
import prettierConfig from 'eslint-config-prettier';

/** @type {import('eslint').Linter.Config[]} */
export default [
  { files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'] },
  {
    languageOptions: {
      globals: globals.browser,
      parser: tsParser,
      sourceType: 'module',
      ecmaVersion: 'latest',
    },
  },
  {
    plugins: {
      '@typescript-eslint': ts,
      react,
      'react-hooks': reactHooks,
      import: importPlugin,
      prettier,
    },
    settings: {
      react: {
        version: 'detect', // Автоматическое определение версии React
      },
    },
    rules: {
      'react/react-in-jsx-scope': 'off', // Отключает требование импорта React
      '@typescript-eslint/no-unused-vars': [
        'warn',
        { argsIgnorePattern: '^_' },
      ],
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      'import/order': [
        'error',
        { groups: ['builtin', 'external', 'internal'] },
      ],
      'import/no-unresolved': 'error',
      'prettier/prettier': 'warn', // Подсветка проблем форматирования
    },
  },
  {
    extends: [
      'plugin:import/errors',
      'plugin:import/warnings',
      'plugin:import/typescript',
    ],
  },
  prettierConfig,

  // pluginJs.configs.recommended,
  // ...tseslint.configs.recommended,
  // pluginReact.configs.flat.recommended,
  // pluginJs: { React },
  //   settings: {
  //     react: { version: 'detect' }, // Определяет версию React автоматически
  //   },
  //   rules: {
  //     'react/react-in-jsx-scope': 'off', // Не требует импорт React
  //   },
];
