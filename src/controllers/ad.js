const { Ad, Influencer, Business } = require("../models");
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  auth: {
    user: "noreply@see.ad",
    pass: "jwov xitg fyev gifp",
  },
});

const templateBusinessEmail = (ad) => {
  const link = `https://see.ad/business/${ad.business}`;
  return (
    `Your invite was accepted by <a href="https://instagram.com/${ad.influencer}">@${ad.influencer}</a>. You can track the campaign’s progress on your dashboard by logging into your account.<br/><br/>` +
    `<a href=${link}>${link}</a><br/><br/>` +
    `Regards,<br/>SeeAd Team`
  );
};

const templateInfluencerEmail = (ad) => {
  const link = `https://see.ad/influencer/${ad.influencer}/partnerships`;
  return (
    `Hi @${ad.influencer}<br/><br/>` +
    `You have been invited to work with <b>${ad.business}</b> on a campaign. You can accept this invite by logging into your partnerships page.<br/><br/>` +
    `<a href=${link}>${link}</a><br/><br/>` +
    `Regards,<br/>SeeAd Team`
  );
};

module.exports.lookup = (req, res) => {
  Ad.find(req.body)
    .sort({ createdAt: -1 })
    .then((ad) => {
      if (ad) {
        res.send({ result: true, data: ad });
      } else {
        res.send({ result: false, message: "Ads not found." });
      }
    })
    .catch((error) => res.send({ result: false, message: "Error :" + error }));
};

module.exports.pickup = (req, res) => {
  Ad.aggregate([
    {
      $group: {
        _id: { business: "$business", website: "$website" },
        docs: { $push: "$$ROOT" },
      },
    },
    {
      $project: {
        _id: 0,
        doc: {
          $cond: [
            { $eq: [{ $size: "$docs" }, 1] },
            { $arrayElemAt: ["$docs", 0] },
            {
              $cond: [
                { $in: [req.body.influencer, "$docs.influencer"] },
                {
                  $arrayElemAt: [
                    {
                      $filter: {
                        input: "$docs",
                        as: "ad",
                        cond: { $eq: ["$$ad.influencer", req.body.influencer] },
                      },
                    },
                    0,
                  ],
                },
                {
                  $arrayElemAt: [
                    {
                      $filter: {
                        input: "$docs",
                        as: "ad",
                        cond: { $eq: ["$$ad.influencer", ""] },
                      },
                    },
                    0,
                  ],
                },
              ],
            },
          ],
        },
      },
    },
    {
      $replaceRoot: { newRoot: "$doc" },
    },
  ])
    .then((ads) => {
      if (ads && Array.isArray(ads) && ads.length !== 0)
        res.send({ result: true, data: ads });
      else res.send({ result: false, message: "No ads found." });
    })
    .catch((error) => {
      res.send({ result: false, message: "Error : " + error });
    });
};

module.exports.create = (req, res) => {
  Ad.findOneAndUpdate(
    { business: req.body.business, website: req.body.website },
    req.body,
    { upsert: true, new: true }
  )
    .then(async (record) => {
      if (req.body?.influencer && req.body.influencer !== "") {
        const influencer = await Influencer.findOne({
          name: "@" + req.body.influencer,
        });
        transporter.sendMail(
          {
            from: '"See.Ad " <noreply@see.ad>',
            to: influencer.email,
            subject: "Partnership Invite",
            html: templateInfluencerEmail(record),
          },
          (error, info) => {
            if (error) {
              console.log("Error occurred while sending email:", error.message);
            } else {
              console.log("Email sent successfully!\n", info);
            }
          }
        );
      }
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
  Ad.findOneAndUpdate(req.body.find, req.body.update)
    .then(async (ad) => {
      if ((req.body?.update?.accepted ?? false) === true) {
        const business = await Business.findOne({
          username: ad.business,
        });
        transporter.sendMail(
          {
            from: '"See.Ad " <noreply@see.ad>',
            to: business.email,
            subject: "Partnership Invite",
            html: templateBusinessEmail(ad),
          },
          (error, info) => {
            if (error) {
              console.log("Error occurred while sending email:", error.message);
            } else {
              console.log("Email sent successfully!\n", info);
            }
          }
        );
      }
      res.send({ result: true, data: ad });
    })
    .catch((error) => res.send({ result: false, message: "Error : " + error }));
};

module.exports.delete = (req, res) => {
  Ad.deleteOne(req.body)
    .then((ad) => {
      res.send({ result: true });
    })
    .catch((error) => res.send({ result: false, message: "Error : " + error }));
};
