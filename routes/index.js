import { signup } from "../controller/user.js";

async function routes(fastify) {
  await fastify.get("/", async (request, reply) => {
    const data = request.session.get("user");
    console.log(data);
    // if (!data) {
    //   reply.code(404).send({ message: "Not Found" });
    //   return;
    // }
    reply.send(data);
  });
  await fastify.post("/signup", signup);
}
export default routes;
