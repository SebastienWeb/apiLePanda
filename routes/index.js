async function routes(fastify) {
  await fastify.get("/", async () => {
    return { message: "Panda est le plus fort de tous !" };
  });
}
export default routes;
