module.exports = {
  root: true,
  env: {
    browser: true,
    es2022: true,
  },
  extends: [
    'airbnb',
    'airbnb/hooks',
    'airbnb-typescript',
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
    'prettier',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs', 'node_modules', 'vite.config.ts', 'tests/setup.ts', 'vitest.config.ts'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
  },
  plugins: [
    'react-refresh',
    '@typescript-eslint',
    'react',
    'prettier',
    'unused-imports',
    'react-compiler'
  ],
  rules: {
    '@typescript-eslint/no-unused-vars': [
      'warn',
      {
        argsIgnorePattern: '^',
        varsIgnorePattern: '^',
        caughtErrorsIgnorePattern: '^_',
      },
    ],
    'prettier/prettier': ['error', { endOfLine: 'auto' }],
    'react-refresh/only-export-components': ['off', { allowConstantExport: true }],
    'no-multiple-empty-lines': ['error', { max: 1 }],
    'no-magic-numbers': [
      'error',
      {
        ignore: [0, 1, -1, 2, -2],
        ignoreDefaultValues: true,
        ignoreArrayIndexes: true,
      },
    ],
    '@typescript-eslint/array-type': ['error', { default: 'array-simple' }],
    'no-console': ['error', { allow: ['warn', 'error'] }],
    'max-classes-per-file': ['error', 1],
    'no-debugger': 'error',
    '@typescript-eslint/no-explicit-any': 'error',
    '@typescript-eslint/no-namespace': [2, { allowDeclarations: true }],
    '@typescript-eslint/explicit-member-accessibility': [
      'error',
      {
        accessibility: 'explicit',
        overrides: {
          accessors: 'explicit',
          constructors: 'off',
          methods: 'explicit',
          properties: 'explicit',
          parameterProperties: 'explicit',
        },
      },
    ],
    '@typescript-eslint/no-non-null-assertion': 'error',
    '@typescript-eslint/consistent-type-assertions': ['error', { assertionStyle: 'never' }],
    curly: ['error', 'all'],
    'no-multi-spaces': 'error',
    'space-in-parens': 'error',
    'no-var': 'error',
    'prefer-const': 'error',
    quotes: ['error', 'single', { allowTemplateLiterals: true }],
    semi: ['error', 'always'],
    'space-infix-ops': ['error', { int32Hint: false }],
    'key-spacing': ['error', { afterColon: true }],
    'unused-imports/no-unused-imports': 'error',
    'import/prefer-default-export': 'off',
    'class-methods-use-this': 'off',
    'react/require-default-props': 'off',
    '@typescript-eslint/lines-between-class-members': 'off',
    'no-return-assign': 'off',
    'react/jsx-props-no-spreading': 'off',
    "react-compiler/react-compiler": "error",
    'react/prefer-stateless-function': 'off',
    "import/no-extraneous-dependencies": ["error", {"devDependencies": true}],
    "react-hooks/exhaustive-deps": 'off',
  },
  "overrides": [
    {
      "files": [
        "*.test.tsx"
      ],
      "rules": {
        "@typescript-eslint/consistent-type-assertions": "off",
        "@typescript-eslint/no-unsafe-argument": "off"
      },
    }
  ],
};
