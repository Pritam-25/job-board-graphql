import {
  createJobService,
  updateJobService,
  deleteJobService,
} from '@services/index.js';
import { searchJobs } from '@repositories/index.js';
import { Resolvers } from 'src/types/graphql-types.js';

const resolvers: Resolvers = {
  Query: {
    searchJobs: async (_root, args, context) => {
      const { query } = args.input;
      return await searchJobs(context.prisma, query);
    },
  },
  Mutation: {
    createJob: async (_root, args, context) => {
      return await createJobService(context, args.input);
    },
    updateJob: async (_root, args, context) => {
      return await updateJobService(context, args.input);
    },
    deleteJob: async (_root, args, context) => {
      return await deleteJobService(context, args.input);
    },
  },
};

export default resolvers;
