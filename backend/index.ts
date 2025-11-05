import express from "express";
import indexRoute from "./routes/index.js";
const app = express();
const PORT = 3000;

app.get("/", (req, res) => {
  res.send("Hello worlddasdsadsa");
});

app.use("/api/index", indexRoute);

app.listen(PORT, (error) => {
  if (error) throw error;
  console.log(`server running at port ${PORT}`);
});
