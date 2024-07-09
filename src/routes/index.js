const uploadRouter = require("./upload");
const questionRouter = require("./question");

module.exports = (app) => {
  app.use("/question", questionRouter);
  app.use("/upload_files", uploadRouter);

  app.get("/", (req, res) => {
    res.send("Welcome to GradePost backend server!!!");
  });
};
