import express, { response } from "express";
import { mongoDbUrl, PORT } from "./config.js";
import mongoose from "mongoose";
import bookRoutes from "./routes/bookRoutes.js";
import cors from "cors";

const app = express();
// middleware which is used to recive the data in json format
app.use(express.json());

app.get("/", (request, response) => {
  console.log(request);
  return response.status(200).send("Vanakkam da mapla");
});

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "PUT", "POST", "DELETE"],
    allowedHeaders: ["content-type"],
  })
);

app.use("/", bookRoutes);

mongoose
  .connect(mongoDbUrl)
  .then(() => {
    console.log("dai mapla database uh vanakkamda");
    app.listen(PORT, () => {
      console.log(`Vanakkam da mapla port ${PORT} la irunthu`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
