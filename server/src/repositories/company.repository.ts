import { PrismaClient } from '@generated/prisma/client.js';

export const findCompanyByName = async (prisma: PrismaClient, name: string) => {
  return prisma.company.findUnique({
    where: { name },
  });
};

export const createCompany = async (prisma: PrismaClient, name: string) => {
  return prisma.company.create({
    data: { name },
  });
};

export default { findCompanyByName, createCompany };
