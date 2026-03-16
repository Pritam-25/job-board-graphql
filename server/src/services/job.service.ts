import {
  createCompany,
  createJob,
  findCompanyByName,
} from '@repositories/index.js';
import { Context } from '@graphql/context.js';
import { CreateJobInput, UpdateJobInput } from 'src/types/graphql-types.js';
import { updateJob, deleteJob } from '@repositories/index.js';
import { GraphQLError } from 'graphql';
import { ERRORS } from '@utils/errorCodes.js';

export const createJobService = async (
  context: Context,
  input: CreateJobInput
) => {
  // Authorization check
  if (!context.user?.isAdmin) {
    throw new GraphQLError(ERRORS.FORBIDDEN.message, {
      extensions: { code: ERRORS.FORBIDDEN.code },
    });
  }

  const { companyName } = input;

  // find existing company
  let company = await findCompanyByName(context.prisma, companyName);

  // if company does not exist, create it
  if (!company) {
    company = await createCompany(context.prisma, companyName);
  }

  // create job with company connection
  const job = await createJob(
    context.prisma,
    input,
    company.id,
    context.user.id
  );

  return job;
};

export const updateJobService = async (
  context: Context,
  input: UpdateJobInput
) => {
  if (!context.user?.isAdmin) {
    throw new GraphQLError(ERRORS.FORBIDDEN.message, {
      extensions: { code: ERRORS.FORBIDDEN.code },
    });
  }

  const { id, companyName } = input;

  let companyId: string | undefined = undefined;

  if (companyName) {
    let company = await findCompanyByName(context.prisma, companyName);
    if (!company) {
      company = await createCompany(context.prisma, companyName);
    }
    companyId = company.id;
  }

  const job = await updateJob(context.prisma, id, input, companyId);
  return job;
};

export const deleteJobService = async (
  context: Context,
  input: { id: string }
) => {
  if (!context.user?.isAdmin) {
    throw new GraphQLError(ERRORS.FORBIDDEN.message, {
      extensions: { code: ERRORS.FORBIDDEN.code },
    });
  }

  const { id } = input;

  await deleteJob(context.prisma, id);

  return true;
};
