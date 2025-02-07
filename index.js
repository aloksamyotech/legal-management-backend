import express from "express";
import corsConfig from "./src/core/config/cors.js";
import connectDB from "./src/core/database/connection.js";
import globalExceptionHandler from "./src/utils/globalException.js";
import logger from "./src/core/config/logger.js";
import "dotenv/config";
import path from "path";
import responseInterceptor from "./src/utils/responseInterceptor.js";
import appRouter from "./src/routes/routes.js";

const app = express();
const PORT = (() => {
  const env = process.env.ENV;
  return env === "development" ? 7200 : 4545;
})();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));
app.use(corsConfig);

app.use((req, res, next) => {
  logger.info(`Incoming request: ${req.method} ${req.originalUrl}`);
  next();
});

connectDB()
  .then(() => {
    logger.info("Database connected successfully");
  })
  .catch((err) => {
    logger.error(`Database connection failed: ${err.message}`);
  });

app.use(responseInterceptor);
app.use("/api/v1", appRouter);

app.use(globalExceptionHandler);

app.listen(PORT, () => {
  logger.info(`Server is running at port ${PORT}`);
});
