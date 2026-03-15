import { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: './src/entities/**/*.graphql',
  generates: {
    './src/types/graphql-types.ts': {
      plugins: ['typescript', 'typescript-resolvers'],
      config: {
        contextType: '../graphql/context.js#Context',
        defaultMapper: 'Partial<{T}>',
        mapperTypeSuffix: 'Model',
        mappers: {
          Job: '@generated/prisma/client.js#Job',
          Company: '@generated/prisma/client.js#Company',
          User: '@generated/prisma/client.js#User',
        },
      },
    },
  },
};

export default config;
