import Fastify from "fastify";

const fastify = Fastify({
  logger: true,
});

import * as dotenv from "dotenv";
dotenv.config();

import { prisma } from "./server.js";

import routes from "./routes/index.js";

import fastifySecureSession from "@fastify/secure-session";

import path from "node:path";
import fs from "node:fs";
import cors from "@fastify/cors";
import { fileURLToPath } from "node:url";

const rootDir = fileURLToPath(import.meta.url);
const __dirname = path.dirname(rootDir);
fastify.register(fastifySecureSession, {
  cookieName: "my-session-cookie",
  key: fs.readFileSync(path.join(__dirname, "secret-key")),
  cookie: {
    path: "/",
  },
});
const start = async () => {
  try {
    await fastify.register(cors);
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
