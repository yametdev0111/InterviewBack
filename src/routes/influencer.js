const express = require('express')

const influencerRouter = express.Router()
const { influencerController } = require('../controllers')

influencerRouter.post('/create', influencerController.create)
influencerRouter.post('/lookup', influencerController.lookup)
influencerRouter.post('/update', influencerController.update)

module.exports = influencerRouter;
