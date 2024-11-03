// import { Redis } from "ioredis";

// export const quitRedis = async (redisClient: Redis) => {
//   await new Promise<void>((resolve) => {
//     redisClient.quit(() => {
//       resolve();
//     });
//   });
//   // redis.quit() creates a thread to close the connection.
//   // We wait until all threads have been run once to ensure the connection closes.
//   await new Promise(resolve => setImmediate(resolve));
// };
