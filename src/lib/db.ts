import { PrismaClient } from "@prisma/client";

const prismaClientSingleton = () => {
  return new PrismaClient({});
};

declare global {
  var prismaGlobal: undefined | ReturnType<typeof prismaClientSingleton>; // eslint-disable-line no-var
}

export const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();

if (process.env.NODE_ENV !== "production") globalThis.prismaGlobal = prisma;
