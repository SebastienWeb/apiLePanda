import Fastify from "fastify";

const fastify = Fastify({
  logger: true,
});

import * as dotenv from "dotenv";
dotenv.config();

import { prisma } from "./server.js";

import routes from "./routes/index.js";

const start = async () => {
  try {
    fastify.register(routes, {
      prefix: "/api",
    });

    await fastify.listen({
      port: 3000,
    });
  } catch (error) {
    fastify.log.error(error);
    await prisma.$disconnect();
    process.exit(1);
  }
};
start();
