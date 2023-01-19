import { createTRPCRouter } from "./trpc";
import { foodRouter } from "./routers/food";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here
 */
export const appRouter = createTRPCRouter({
  food: foodRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
