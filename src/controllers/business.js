const { Business } = require("../models");

module.exports.lookup = (req, res) => {
  console.log("Lookup Business");
  Business.find(req.body)
    .sort({ createdAt: -1 })
    .then((business) => {
      if (business) {
        res.send({ result: true, data: business });
      } else {
        res.send({ result: false, message: "Businesss not found." });
      }
    })
    .catch((error) => res.send({ result: false, message: "Error :" + error }));
};

module.exports.create = (req, res) => {
  console.log("Create Business");
  const newBusiness = new Business(req.body);
  newBusiness
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
  Business.findOneAndUpdate(req.body.find, req.body.update)
    .then((business) => {
      res.send({ result: true, data: business });
    })
    .catch((error) => res.send({ result: false, message: "Error : " + error }));
};
