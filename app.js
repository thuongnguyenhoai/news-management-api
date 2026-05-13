import express from "express";
import "dotenv/config";
import newsRoutes from "./src/routes/newsRoutes.js";
import { errorHandler } from "./src/middlewares/errorHandler.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// route
app.use("/news", newsRoutes);

// error handler
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`server đang chạy cổng http://localhost:${PORT}`);
});

