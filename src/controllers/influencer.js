const { Influencer } = require("../models");

module.exports.lookup = (req, res) => {
  console.log("Lookup Influencer");
  Influencer.find(req.body)
    .sort({ createdAt: -1 })
    .then((influencer) => {
      if (influencer) {
        res.send({ result: true, data: influencer });
      } else {
        res.send({ result: false, message: "Influencers not found." });
      }
    })
    .catch((error) => res.send({ result: false, message: "Error :" + error }));
};

module.exports.create = (req, res) => {
  console.log("Create Influencer");
  const newInfluencer = new Influencer(req.body);
  newInfluencer
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
  Influencer.findOneAndUpdate(req.body.find, req.body.update)
    .then((influencer) => {
      res.send({ result: true, data: influencer });
    })
    .catch((error) => res.send({ result: false, message: "Error : " + error }));
};
