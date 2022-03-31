import express from "express";
import cors from "cors";
import filesRouter from "./routes/files";

async function init() {
  const app = express();

  app.use(express.json());
  app.use(cors());

  app.use("/api/files", filesRouter);

  app.use((req, res) => {
    res.status(404).json({ message: "not found" });
  });

  app.listen(8080, () => {
    console.log("Files service alive!");
  });
}

init();
