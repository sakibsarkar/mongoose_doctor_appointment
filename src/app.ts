import cors from "cors";
import express, { Application } from "express";
import http from "http";
import morgan from "morgan";
import connectDB from "./config/db";

import errorMiddleware from "./middlewares/error";
import routes from "./routes/v1";

const app: Application = express();

// Apply CORS middleware
app.use(
  cors({
    origin: "*",
  })
);
app.use(morgan("dev"));

// Connect to Database
connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const server = http.createServer(app);

app.use("/api/v1", routes);

// Middleware for Errors
app.use(errorMiddleware);

//handle not found
app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: "Not Found",
    errorMessages: [
      {
        path: req.originalUrl,
        message: "API Not Found",
      },
    ],
  });
  next();
});

const port: any = process.env.PORT || 5000;

server.listen(port, () => {
  console.log(
    `App is running on port: ${port}. Run with http://localhost:${port}`
  );
});
