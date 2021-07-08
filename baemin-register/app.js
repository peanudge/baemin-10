import createError from "http-errors";
import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import dotenv from "dotenv";

import indexRouter from "./routes/index.js";
import authRouter from "./routes/auth.js";

import { SQLITE3AccountStore } from "./models/account/sqlite/SQLITE3AccountStore.js";
import { createMockAccounts } from "./mock/MockData.js";

const __dirname = path.resolve();

dotenv.config();

export const AccountStore = new SQLITE3AccountStore();

if (process.env.MOCK_DATA) {
  await createMockAccounts();
}

console.log("DB FILE:", process.env.SQLITE_FILE);

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// TODO: add Express Session middleware
// TODO: add Embeded DB middleware

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/auth", authRouter);

// TODO: Add API (/user/id)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

export default app;
