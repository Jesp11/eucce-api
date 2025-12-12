import Fastify from "fastify";
import dotenv from "dotenv";


dotenv.config();

import { sequelize } from "./plugins/sequelize.js";
import { userRoutes } from "./routes.js";
import { swaggerSetup } from "./config/swagger.js";

const fastify = Fastify({logger:{
    transport: {
        target: 'pino-pretty'
    }
}});

await swaggerSetup(fastify);

const app = fastify;

app.register(userRoutes, { prefix: "/api" });

async function start() {
  try {
    await sequelize.authenticate().then(() => {
      console.log("Conexión a la base de datos establecida correctamente.");
    });
    
    await app.listen({ port: Number(process.env.PORT) || 3000, host: "0.0.0.0" });
        
    if (process.env.NODE_ENV !== "production") {
      console.log(`Documentación disponible en http://localhost:${Number(process.env.PORT) || 3000}/docs`);
    }
        
  } catch (err) {
    console.error("Ocurrió un error al iniciar:", err);
    process.exit(1);
  }
}

start();
