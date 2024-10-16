import globals from "globals";
import pluginJs from "@eslint/js";
import prettierPlugin from 'eslint-plugin-prettier';
import prettierConfig from 'eslint-config-prettier';

export default [
  {
    ignores: ['node_modules/**'], // Ignore node_modules
  },
  {
    files: ['**/*.js'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: globals.browser
    },
    plugins: {
      prettier: prettierPlugin, // Integrate Prettier with ESLint
    },
    rules: {
      ...prettierConfig.rules, // Load Prettier's recommended rules
      'prettier/prettier': 'error', // Enforce Prettier formatting
    },
  },
  pluginJs.configs.recommended,
];


