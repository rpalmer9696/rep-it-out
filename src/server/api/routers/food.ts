import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "../trpc";
import { prisma } from "@/server/db";
import { TRPCError } from "@trpc/server";

const getUser = async (email: string) => {
  return prisma.user.findUnique({
    where: {
      email: email,
    },
  });
};

export const foodRouter = createTRPCRouter({
  getForDate: protectedProcedure
    .input(z.object({ date: z.string(), email: z.string() }))
    .query(async ({ input }) => {
      const user = await getUser(input.email);

      if (!user) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "User not found",
        });
      }

      return prisma.food.findMany({
        where: {
          date: new Date(input.date),
          userId: user.id,
        },
      });
    }),
  create: protectedProcedure
    .input(
      z.object({
        date: z.string(),
        name: z.string(),
        amount: z.number(),
        email: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      const user = await getUser(input.email);

      if (!user) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "User not found",
        });
      }

      return prisma.food.create({
        data: {
          date: new Date(input.date),
          name: input.name,
          amount: input.amount,
          unit: "g",
          userId: user.id,
        },
      });
    }),
});
