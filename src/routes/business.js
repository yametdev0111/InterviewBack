const express = require('express')

const businessRouter = express.Router()
const { businessController } = require('../controllers')

businessRouter.post('/create', businessController.create)
businessRouter.post('/lookup', businessController.lookup)
businessRouter.post('/update', businessController.update)

module.exports = businessRouter;
