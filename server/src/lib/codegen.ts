import { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: './src/entities/**/*.graphql',
  generates: {
    './src/types/graphql-types.ts': {
      plugins: ['typescript', 'typescript-resolvers'],
      config: {
        contextType: '../context#Context',
        defaultMapper: 'Partial<{T}>',
      },
    },
  },
};

export default config;
