import express from "express";
import filesRouter from "./routes/files";

async function init() {
  const app = express();

  app.use(express.json());

  app.use("/api/files", filesRouter);

  app.get("/", (req, res) => {
    res.send("Hello world !!");
  });

  app.listen(8080, () => {
    console.log("Files service alive!");
  });
}

init();
