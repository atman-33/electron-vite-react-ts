module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    '@electron-toolkit/eslint-config-ts/recommended',
    '@electron-toolkit/eslint-config-prettier',
    'plugin:storybook/recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'plugin:@typescript-eslint/recommended'
  ],
  rules: {
    '@typescript-eslint/explicit-function-return-type': 'off',
    'import/no-restricted-paths': [
      'error',
      {
        zones: [
          // Domain層が依存してはいけない領域
          {
            target: './src/main/domain/**/!(*.spec.ts|*.test.ts)',
            from: './src/main/use-case/**/*',
            message: 'Domain層でUseCase（Application）層をimportしてはいけません。'
          },
          {
            target: './src/main/domain/**/!(*.spec.ts|*.test.ts)',
            from: './src/main/presentation/**/*',
            message: 'Domain層でPresentation層をimportしてはいけません。'
          },
          {
            target: './src/main/domain/**/!(*.spec.ts|*.test.ts)',
            from: './src/main/infrastructure/**/*!(test).ts',
            message: 'Domain層でInfrastructure層をimportしてはいけません。'
          },
          // UseCase（Application）層が依存してはいけない領域
          {
            target: './src/main/use-case/**/!(*.spec.ts|*.test.ts)',
            from: './src/main/presentation/**/*',
            message: 'UseCase（Application）層でPresentation層をimportしてはいけません。'
          },
          {
            target: './src/main/use-case/**/!(*.spec.ts|*.test.ts)',
            from: './src/main/infrastructure/**/*',
            message: 'UseCase（Application）層でInfrastructure層をimportしてはいけません。'
          }
        ]
      }
    ]
  }
};
