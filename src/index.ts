import { ItemServiceResponseInterface } from "./utils/types";
import express from "express";
import env from "dotenv";
import { MongoClient } from "mongodb";
import routes from "./routes";
import { connectToDatabase } from "./config/mongo";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

env.config();

app.use("/api/v1", routes);

const port = process.env.PORT;
if (process.env.NODE_ENV !== "test") {
  if (process.env.DB_TYPE === "mongo") {
    connectToDatabase()
      .then(() => {
        app.listen(port, () => {
          console.log(`Server started at http://localhost:${port}`);
        });
      })
      .catch((error: Error) => {
        console.error("Database connection failed", error);
        process.exit();
      });
  } else {
    app.listen(port, () => {
      console.log(`Server started on port ${port}`);
    });
  }
}

export default app;
