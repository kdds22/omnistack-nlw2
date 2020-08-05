import express from "express";

const app = express();

app.use(express.json());

app.post("/users", (request, response) => {
  const users = [
    { name: "Klaus", age: 24 },
    { name: "Leticia", age: 22 },
    { name: "Sophia", age: 17 },
    request.body,
  ];

  console.log(users);

  return response.json(users);
});

//localhost:3333

app.listen(3333);
