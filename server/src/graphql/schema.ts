import { loadSchemaSync } from '@graphql-tools/load';
import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader';
import { makeExecutableSchema } from '@graphql-tools/schema';

import { resolvers as userResolvers } from '@entities/user/index.js';
import { resolvers as jobResolvers } from '@entities/job/index.js';
import { resolvers as companyResolvers } from '@entities/company/index.js';

const typeDefs = loadSchemaSync('src/entities/**/*.graphql', {
  loaders: [new GraphQLFileLoader()],
});

const schema = makeExecutableSchema({
  typeDefs: [typeDefs],
  resolvers: [userResolvers, jobResolvers, companyResolvers],
});

export default schema;
