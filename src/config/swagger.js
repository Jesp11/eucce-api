import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUI from "@fastify/swagger-ui";

/**
 * @param {import("fastify").FastifyInstance} fastify
 */
export async function swaggerSetup(fastify) {
  if (process.env.NODE_ENV === "production") return;

  await fastify.register(fastifySwagger, {
    openapi: {
      info: {
        title: "Eucce Backend API",
        description: "Documentación de la API de Eucce Backend",
        version: "1.0.0",
      },
      tags: [
        { name: "General", description: "General API operations" },
      ],
    },
  });

  fastify.register(fastifySwaggerUI, {
    routePrefix: "/docs",
  });
}
