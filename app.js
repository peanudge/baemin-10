import { default as DBG } from "debug";
import createError from "http-errors";
import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import dotenv from "dotenv";
import session from "express-session";

import routes from "./routes/index.js";

import { SQLITE3AccountStore } from "./models/account/sqlite/SQLITE3AccountStore.js";
import { createAccountTable } from "./models/account/sqlite/account-sqlite3.js";

import { createMockAccounts } from "./mock/mockData.js";

const __dirname = path.resolve();

dotenv.config();

// Database Setting
export const AccountStore = new SQLITE3AccountStore();
await createAccountTable();
if (process.env.MOCK_DATA) {
  await createMockAccounts();
}

DBG.log("DB FILE PATH:", process.env.SQLITE_FILE);

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));

app.use(express.static(path.join(__dirname, "public")));

app.use(
  session({
    secret: "woowahan10",
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 60000 },
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/", routes);

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
