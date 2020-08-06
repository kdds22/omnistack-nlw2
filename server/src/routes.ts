import express, { request, response } from "express";
import db from "./database/connections";

const routes = express.Router();

routes.post("/classes", async (request, response) => {
  const { name, avatar, whatsapp, bio, subject, cost, schedule } = request.body;

  const insertedUsersId = await db("users").insert({
    name,
    avatar,
    whatsapp,
    bio,
  });

  const user_id = insertedUsersId;

  await db("classes").insert({
    subject,
    cost,
    user_id,
  });

  return response.send();
});

export default routes;
