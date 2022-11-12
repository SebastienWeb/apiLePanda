import bcrypt from "bcrypt";
// import jwt from "jsonwebtoken";
import { prisma } from "../server.js";
import * as dotenv from "dotenv";
import PasswordValidator from "password-validator";
dotenv.config();

export const signup = async (req, reply) => {
  const schema = new PasswordValidator();
  schema
    .is()
    .min(8)
    .is()
    .max(255)
    .has()
    .uppercase()
    .has()
    .lowercase()
    .has()
    .digits()
    .has()
    .symbols();
  const { email, name, password } = req.body;

  if (!email || !name || !password) {
    return reply.code(400).send({ message: "Input Required" });
  }

  const userExist = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  const nameExist = await prisma.user.findUnique({
    where: {
      name: name,
    },
  });

  if (userExist || nameExist) {
    return reply.status(400).send({
      message: "User already exist",
    });
  }

  try {
    if (!schema.validate(password)) {
      return reply.status(400).send({
        message: "Invalid Password",
      });
    }
    const hashPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email: email,
        name: name,
        password: hashPassword,
      },
    });
    console.log(req.session);
    req.session.set("user", {
      id: user.id,
      role: user.role,
    });
    console.log(req.session.get("user"));

    return reply.code(201).send({
      message: "User created successfully",
      user,
    });
  } catch (error) {
    reply.send(error);
  }
};
