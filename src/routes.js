/**
 * @param {import("fastify").FastifyInstance} app
 */
export async function userRoutes(app) {
  app.get("/health", { schema:{ tags:["General"] } }, () => {
    return { message: "Eucce API is running" };
  });
}
