
// init project
const express = require('express');
const mongoose = require('mongoose');
// const bodyParser = require('body-parser');

const app = express();
app.use(express.json());

// Establish a connection with the Mongo Database
// Get the username, password, host, and databse from the .env file
// Connect to MongoDB
const mongoDB =
  "mongodb+srv://" +
  process.env.USERNAME +
  ":" +
  process.env.PASSWORD +
  "@" +
  process.env.HOST +
  "/" +
  process.env.DATABASE;
mongoose.connect(mongoDB, { retryWrites: true });

app.use(
  express.static("views", {
    setHeaders: (res, path, stat) => {
      if (path.endsWith(".js")) {
        res.set("Content-Type", "application/javascript");
      }
    },
  })
);

app.use(
  express.static("views", {
    setHeaders: (res, path) => {
      if (path.endsWith(".css")) {
        res.setHeader("Content-Type", "text/css");
      }
    },
  })
);

// set the view engine
app.set("view engine", "ejs")


// Load routes
const indexRouter = require("./routes/index");
const trainerRoutes = require("./routes/trainerRoutes");
const memberRoutes = require("./routes/memberRoutes");
const adminRoutes = require("./routes/adminRoutes");
const trainingSessionRoutes = require("./routes/trainingSessionRoutes");


app.use("/", indexRouter);
app.use("/api/trainer", trainerRoutes);
app.use("/api/member", memberRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/booktrainer", trainingSessionRoutes);
// app.use("/api/admin", adminRoutes);

app.use(express.static('public')); 

const routes = [
  "",
  "index",
  "trainerlogin",
  "memberlogin",
  "trainersignup",
  "membersignup",
  "trainerprofile",
  "memberprofile",
  "memberhome",
  "booktrainer",
  "trainerhome",
  "adminlogin",
  "adminhome",
  "viewAllTrainers",
  "viewAllMembers"
];

routes.forEach((route) => {
  app.get(`/${route}`, (req, res) => {
    res.render(route || "index");
  });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});