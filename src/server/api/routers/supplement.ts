import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "../trpc";
import { prisma } from "@/server/db";
import { TRPCError } from "@trpc/server";
import { getUser } from "@/utils/helpers";

export const supplementRouter = createTRPCRouter({
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

      return prisma.supplement.findMany({
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

      return prisma.supplement.create({
        data: {
          date: new Date(input.date),
          name: input.name,
          amount: input.amount,
          userId: user.id,
        },
      });
    }),
});
