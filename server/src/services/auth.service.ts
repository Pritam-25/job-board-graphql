import { Response } from 'express';
import { signToken } from '@utils/jwt.js';
import type { Context } from '@graphql/context.js';
import type { LoginInput, SignupInput } from 'src/types/graphql-types.js';
import { UserRole } from 'src/types/graphql-types.js';
import { createUser, findUserByEmail } from '@repositories/user.repository.js';
import { hashPassword, verifyPassword } from '@utils/password.js';

function loginUser(res: Response, user: { id: string; isAdmin?: boolean }) {
  const token = signToken({ id: user.id, isAdmin: Boolean(user.isAdmin) });
  res.cookie('token', token, { httpOnly: true, sameSite: 'lax' });
  return token;
}

export function logoutUser(res: Response) {
  res.clearCookie('token');
}

export async function signupService(context: Context, input: SignupInput) {
  const { email, name, password } = input;

  const existingUser = await findUserByEmail(context.prisma, email);

  if (existingUser) {
    throw new Error('Email already exists');
  }

  const hashedPassword = await hashPassword(password);

  return await createUser(context.prisma, {
    email,
    name,
    password: hashedPassword,
  });
}

export async function loginService(context: Context, input: LoginInput) {
  const { email, password } = input;

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

  return user;
}

export default { logoutUser, signupService, loginService };
