import { searchJobs } from '@repositories/job.repository.js';
import { Resolvers } from 'src/types/graphql-types.js';

const resolvers: Resolvers = {
  Query: {
    searchJobs: async (_root, args, context) => {
      const { query } = args.input;
      return await searchJobs(context.prisma, query);
    },
  },
};

export default resolvers;
