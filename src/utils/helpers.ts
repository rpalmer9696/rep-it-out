import { prisma } from "@/server/db";

export const getUser = async (email: string) => {
  return prisma.user.findUnique({
    where: {
      email: email,
    },
  });
};
