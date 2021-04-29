import express from "express";
import {
  adminRouter,
  authRouter,
  movieRouter,
  usersRouter,
  profileRouter,
} from "./controllers/index.js";
import Database from "./common/db/database.js";
import dbConf from "../config/db.js";
import cors from "cors";

const port = process.env.PORT || 3005;

const app = express();

//app.use(express.static(path.join(__dirname, "build")));
app.set("db", new Database(dbConf));
app.use(cors());

// app.get("/*", function (req, res) {
//   res.sendFile(path.join(__dirname, "build", "index.html"));
// });
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api/movies", moviesController);
app.use("/api/users", usersController);
app.use("/api/profiles", profilesController);
app.use("/api/auth", authController);
app.use("/api/admin", adminController);

app.listen(port, () => {
  console.log(`Rest api for test listening at http://localhost:${port}`);
});
