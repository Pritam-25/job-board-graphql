import { Resolvers } from 'src/types/graphql-types.js';

const resolvers: Resolvers = {
  Query: {
    users: async (_parent, _args, context) => {
      return context.prisma.user.findMany();
    },
  },
};

export default resolvers;
