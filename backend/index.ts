import express from "express";
import indexRoute from "./routes/dashboard.js";
const app = express();
const PORT = 3000;

app.use("/api/dashboard", indexRoute);

app.listen(PORT, (error) => {
  if (error) throw error;
  console.log(`server running at port ${PORT}`);
});
