import express from "express";

const app = express();
const PORT = 3000;

app.get("/", (req, res) => {
  res.send("Hello worlddasdsadsa");
});

app.listen(PORT, (error) => {
  if (error) throw error;
  console.log(`server running at port ${PORT}`);
});
