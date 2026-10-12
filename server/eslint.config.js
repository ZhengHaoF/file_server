import js from '@eslint/js';
import globals from 'globals';

export default [
    { ignores: ['node_modules/**', 'web/**', 'admin/**', 'dist/**', 'coverage/**'] },
    js.configs.recommended,
    {
        files: ['**/*.js', '**/*.mjs'],
        languageOptions: { ecmaVersion: 'latest', sourceType: 'module', globals: globals.node },
        rules: {
            'no-unused-vars': ['error', { argsIgnorePattern: '^_', caughtErrors: 'none' }],
            eqeqeq: ['error', 'always'],
            'no-var': 'error',
            'prefer-const': 'error',
        },
    },
    {
        files: ['utils/fileSafety.js'],
        // Intentional validation of NUL and other control bytes in hostile filenames.
        rules: { 'no-control-regex': 'off' },
    },
];
