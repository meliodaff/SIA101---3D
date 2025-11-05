import express from "express";
import dashboardRoute from "./routes/dashboard.js";
import suppliersRoute from "./routes/suppliers.js";
const app = express();
const PORT = 3000;

app.use("/api/dashboard", dashboardRoute);
app.use("/api/suppliers", suppliersRoute);

app.listen(PORT, (error) => {
  if (error) throw error;
  console.log(`server running at port ${PORT}`);
});
