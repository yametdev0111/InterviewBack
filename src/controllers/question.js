const { Question } = require("../models");

module.exports.lookup = (req, res) => {
  const find = {
    category: req.body?.category,
    question: req.body?.question,
    answer: req.body?.answer
  };
  Question.countDocuments(find).then((count) => {
    Question.find(find)
      .skip(req.body.from)
      .limit(req.body.count)
      .sort({ votes: 1, views: 1, createdAt: -1 })
      .then((questions) => {
        if (questions) {
          res.send({ result: true, data: questions, count });
        } else {
          res.send({ result: false, message: "Questions not found." });
        }
      })
      .catch((error) =>
        res.send({ result: false, message: "Error :" + error })
      );
  });
};

module.exports.create = (req, res) => {
  const newQuestion = new Question(req.body);
  newQuestion
    .save()
    .then((record) => {
      res.send({ result: true, data: record });
    })
    .catch((error) => {
      res.send({
        result: false,
        message: "Error : " + error,
      });
    });
};

module.exports.update = (req, res) => {
  Question.findOneAndUpdate(req.body.find, req.body.update)
    .then((question) => {
      res.send({ result: true, data: question });
    })
    .catch((error) => res.send({ result: false, message: "Error : " + error }));
};

module.exports.delete = (req, res) => {
  Question.deleteOne(req.body)
    .then((question) => {
      res.send({ result: true, data: question });
    })
    .catch((error) => res.send({ result: false, message: "Error : " + error }));
};
