import express from "express";
import dashboardRoute from "./routes/dashboard.js";
import suppliersRoute from "./routes/suppliers.js";
import analyticsRoute from "./routes/analytics.js";
import requisitionsRoute from "./routes/requisitions.js";
import cors from "cors";

const app = express();
const PORT = 3000;
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use("/api/dashboard", dashboardRoute);
app.use("/api/suppliers", suppliersRoute);
app.use("/api/analytics", analyticsRoute);
app.use("/api/requisitions", requisitionsRoute);

app.listen(PORT, (error) => {
  if (error) throw error;
  console.log(`server running at port ${PORT}`);
});
