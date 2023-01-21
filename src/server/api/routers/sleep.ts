import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "../trpc";
import { prisma } from "@/server/db";
import { TRPCError } from "@trpc/server";
import { getUser } from "@/utils/helpers";

export const sleepRouter = createTRPCRouter({
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

      return prisma.sleep.findFirst({
        where: {
          date: new Date(input.date),
          userId: user.id,
        },
      });
    }),
  setSleepAmount: protectedProcedure
    .input(
      z.object({
        date: z.string(),
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

      const existingSleepAmount = await prisma.sleep.findFirst({
        where: {
          date: new Date(input.date),
          userId: user.id,
        },
      });

      if (existingSleepAmount) {
        return prisma.sleep.update({
          where: {
            id: existingSleepAmount.id,
          },
          data: {
            amount: input.amount,
          },
        });
      }

      return prisma.sleep.create({
        data: {
          date: new Date(input.date),
          amount: input.amount,
          userId: user.id,
        },
      });
    }),
});
