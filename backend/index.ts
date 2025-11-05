import express from "express";
import dashboardRoute from "./routes/dashboard.js";
import suppliersRoute from "./routes/suppliers.js";
import analyticsRoute from "./routes/analytics.js";
import requisitionsRoute from "./routes/requisitions.js";
import departmentsRoute from "./routes/departments.js";
const app = express();
const PORT = 3000;

app.use("/api/dashboard", dashboardRoute);
app.use("/api/suppliers", suppliersRoute);
app.use("/api/analytics", analyticsRoute);
app.use("/api/requisitions", requisitionsRoute);
app.use("/api/departments", departmentsRoute);

app.listen(PORT, (error) => {
  if (error) throw error;
  console.log(`server running at port ${PORT}`);
});
