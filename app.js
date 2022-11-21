import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRouter from "./routes/authRouter.js"
// import userRouter from "./routes/userRouter.js"
// import movieRouter from "./routes/movieRouter.js"
// import listRouter from "./routes/listRouter.js"

const app = express();
dotenv.config();

const PORT = process.env.PORT || 8800;
mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/${process.env.DB_NAME}?retryWrites=true&w=majority`
  )
  .then(() => {
    console.log(`Database connected 😎`);
  })
  .catch((err) => {
    console.log(err);
  });

app.use(express.json());

app.use("/api/auth", authRouter);
// app.use("/api/users", userRouter);
// app.use("/api/movies", movieRouter);
// app.use("/api/lists", listRouter);

app.use((req, res, next) => {
  const error = new Error("Hey! Page Not Found!");
  error.status = 404;
  next(error);
});

//Global error handler middleware
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

app.listen(PORT, () => {
  console.log(`listening to ${PORT}  port`);
});
