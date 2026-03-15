import { Resolvers, UserRole } from 'src/types/graphql-types.js';
import {
  createUser,
  findAllUsers,
  findUserByEmail,
  findUserById,
} from '@repositories/user.repository.js';
import { hashPassword, verifyPassword } from '@utils/password.js';
import { loginUser, logoutUser } from '@services/auth.service.js';

const resolvers: Resolvers = {
  Query: {
    me: async (_root, _args, context) => {
      if (!context.user) return null;

      const user = await findUserById(context.prisma, context.user.id);

      if (!user) return null;

      return {
        ...user,
        role: user.role as UserRole,
      };
    },

    users: async (_root, _args, context) => {
      const users = await findAllUsers(context.prisma);

      return users.map(user => ({
        ...user,
        role: user.role as UserRole,
      }));
    },
  },
  Mutation: {
    signup: async (_root, args, context) => {
      const { email, name, password } = args.input;

      const existingUser = await findUserByEmail(context.prisma, email);

      if (existingUser) {
        throw new Error('Email already exists');
      }

      const hashedPassword = await hashPassword(password);

      const newUser = await createUser(context.prisma, {
        email,
        name,
        password: hashedPassword,
      });

      return {
        ...newUser,
        role: newUser.role as UserRole,
      };
    },
    login: async (_root, args, context) => {
      const { email, password } = args.input;

      const user = await findUserByEmail(context.prisma, email);
      if (!user) {
        throw new Error('Invalid email or password');
      }

      const isValidPassword = await verifyPassword(password, user.password);
      if (!isValidPassword) {
        throw new Error('Invalid email or password');
      }

      loginUser(context.res, {
        id: user.id,
        isAdmin: user.role === UserRole.Admin,
      });

      return {
        ...user,
        role: user.role as UserRole,
      };
    },
    logout: async (_root, _args, context) => {
      logoutUser(context.res);
      return true;
    },
  },
};

export default resolvers;
