import { Prisma, PrismaClient } from '@generated/prisma/client.js';
import { removeNull } from '@utils/removeNull.js';
import { CreateJobInput, UpdateJobInput } from 'src/types/graphql-types.js';

export async function appliedJobs(prisma: PrismaClient, userId: string) {
  return prisma.job.findMany({
    where: {
      applicants: { some: { id: userId } },
    },
  });
}

export async function ownedJobs(prisma: PrismaClient, userId: string) {
  return prisma.job.findMany({
    where: {
      ownerId: userId,
    },
  });
}

export async function searchJobs(prisma: PrismaClient, query: string) {
  return prisma.job.findMany({
    where: {
      OR: [
        { title: { contains: query, mode: 'insensitive' } },
        { description: { contains: query, mode: 'insensitive' } },
        { location: { contains: query, mode: 'insensitive' } },
      ],
    },
  });
}

export async function createJob(
  prisma: PrismaClient,
  data: CreateJobInput,
  companyId: string,
  ownerId: string
) {
  const { title, description, location, type, remote, salary } = data;

  const job = await prisma.job.create({
    data: {
      title,
      description,
      location,
      type,
      remote,
      salary,
      company: {
        connect: { id: companyId },
      },
      owner: {
        connect: { id: ownerId },
      },
    },
  });

  return job;
}

export async function updateJob(
  prisma: PrismaClient,
  jobId: string,
  data: UpdateJobInput,
  companyId?: string
) {
  const { id, companyName, ...rest } = data;

  const updateData = removeNull(rest);

  const job = await prisma.job.update({
    where: { id: jobId },
    data: {
      ...(updateData as Prisma.JobUpdateInput),
      ...(companyId && {
        company: {
          connect: { id: companyId },
        },
      }),
    },
  });

  return job;
}

export async function deleteJob(prisma: PrismaClient, jobId: string) {
  const job = await prisma.job.delete({ where: { id: jobId } });
  return job;
}
