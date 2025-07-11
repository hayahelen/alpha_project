import express from "express";
import userRoutes from "./routes/userRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import errorHandler from "./middleware/errorHandler.js";
import merchantRoutes from "./routes/merchantRoutes.js";
import roleRoutes from "./routes/roleRoutes.js";
import rolesAndPermissionsRoutes from "./routes/rolesAndPermissionsRoutes.js";

const app = express();
const port = 4000;

app.use(express.json());

app.use("/api", authRoutes);

app.use("/api/users", userRoutes);
app.use("/api/merchants", merchantRoutes);
app.use("/api/roles", roleRoutes);
app.use("/api/permissions", rolesAndPermissionsRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () =>
  console.log(`API listening on http://localhost:${PORT}`)
);
