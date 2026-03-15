import { PrismaClient } from '@generated/prisma/client.js';

export async function appliedJJobs(prisma: PrismaClient, userId: string) {
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
