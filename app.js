require("dotenv").config();
require("./db");
const express = require("express");

const app = express();

const { isAuthenticated } = require("./middlewares/jwt.middleware");

// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require("./config")(app);


// const cors = require('cors');

// app.use(cors({
//     origin: process.env.ORIGIN,
//     methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
//     credentials: true, // This allows cookies to be sent cross-origin
// }));

// 👇 Start handling routes here
const indexRoutes = require("./routes/index.routes");
app.use("/api", indexRoutes);

const authRouter = require("./routes/auth.routes");
app.use("/auth", authRouter);

const recipeRouter = require("./routes/recipe.routes");
app.use("/recipes", recipeRouter);

const workoutsRouter = require("./routes/workouts.routes");
app.use("/workouts", workoutsRouter);

const profileRouter = require("./routes/profile.routes");
app.use("/profile", profileRouter);

const commentRatingRouter = require("./routes/comment-rating.routes");
app.use("/comment-rating", commentRatingRouter);

const paymentRouter = require("./routes/payment.routes");
app.use("/payment", paymentRouter);

// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);

module.exports = app;
