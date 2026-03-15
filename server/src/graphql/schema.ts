import 'graphql-import-node';
import { makeExecutableSchema } from '@graphql-tools/schema';

import {
  resolvers as userResolvers,
  typeDefs as userTypeDefs,
} from '../entities/user/index.js';
import {
  resolvers as jobResolvers,
  typeDefs as jobTypeDefs,
} from '../entities/job/index.js';
import {
  resolvers as companyResolvers,
  typeDefs as companyTypeDefs,
} from '../entities/company/index.js';

const schema = makeExecutableSchema({
  typeDefs: [userTypeDefs, jobTypeDefs, companyTypeDefs],
  resolvers: [userResolvers, jobResolvers, companyResolvers],
});

export default schema;

export const typeDefs = `#graphql
  type Book {
    title: String
    author: String
  }

  type Query {
    books: [Book]
  }
`;
