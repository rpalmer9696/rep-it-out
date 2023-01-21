import { createTRPCRouter } from "./trpc";
import { exerciseRouter } from "./routers/exercise";
import { foodRouter } from "./routers/food";
import { supplementRouter } from "./routers/supplement";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here
 */
export const appRouter = createTRPCRouter({
  exercise: exerciseRouter,
  food: foodRouter,
  supplement: supplementRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
