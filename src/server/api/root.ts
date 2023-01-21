import { createTRPCRouter } from "./trpc";
import { exerciseRouter } from "./routers/exercise";
import { foodRouter } from "./routers/food";
import { sleepRouter } from "./routers/sleep";
import { supplementRouter } from "./routers/supplement";
import { waterRouter } from "./routers/water";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here
 */
export const appRouter = createTRPCRouter({
  exercise: exerciseRouter,
  food: foodRouter,
  sleep: sleepRouter,
  supplement: supplementRouter,
  water: waterRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
