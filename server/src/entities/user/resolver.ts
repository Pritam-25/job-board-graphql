import { Resolvers } from 'src/types/graphql-types.js';
import { findAllUsers, findUserById } from '@repositories/user.repository.js';
import { loginService, logoutUser, signupService } from '@services/index.js';
import { appliedJobs, ownedJobs } from '@repositories/index.js';
import { GraphQLError } from 'graphql';
import { ERRORS } from '@utils/errorCodes.js';

const resolvers: Resolvers = {
  User: {
    appliedJobs: async (user, _args, context) => {
      return await appliedJobs(context.prisma, user.id);
    },
    jobsOwned: async (user, _args, context) => {
      if (!context.user?.isAdmin) {
        throw new GraphQLError(ERRORS.FORBIDDEN.message, {
          extensions: { code: ERRORS.FORBIDDEN.code },
        });
      }

      return await ownedJobs(context.prisma, user.id);
    },
  },
  Query: {
    me: async (_root, _args, context) => {
      if (!context.user) return null;

      return await findUserById(context.prisma, context.user.id);
    },

    users: async (_root, _args, context) => {
      return await findAllUsers(context.prisma);
    },
  },
  Mutation: {
    signup: async (_root, args, context) => {
      return signupService(context, args.input);
    },
    login: async (_root, args, context) => {
      return loginService(context, args.input);
    },
    logout: async (_root, _args, context) => {
      logoutUser(context.res);
      return true;
    },
  },
};

export default resolvers;
