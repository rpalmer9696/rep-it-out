import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "../trpc";
import { prisma } from "@/server/db";
import { TRPCError } from "@trpc/server";
import { getUser } from "@/utils/helpers";

export const exerciseRouter = createTRPCRouter({
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

      return prisma.exercise.findMany({
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
        weight: z.number(),
        reps: z.number(),
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

      return prisma.exercise.create({
        data: {
          date: new Date(input.date),
          name: input.name,
          weight: input.weight,
          reps: input.reps,
          userId: user.id,
        },
      });
    }),
  editExercise: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.string(),
        reps: z.number(),
        weight: z.number(),
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

      return prisma.exercise.update({
        where: {
          id: input.id,
        },
        data: {
          name: input.name,
          reps: input.reps,
          weight: input.weight,
        },
      });
    }),
  deleteExercise: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .mutation(({ input }) =>
      prisma.exercise.delete({ where: { id: input.id } })
    ),
});
