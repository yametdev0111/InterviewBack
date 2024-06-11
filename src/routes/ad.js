const express = require('express')

const adRouter = express.Router()
const { adController } = require('../controllers')

adRouter.post('/create', adController.create)
adRouter.post('/lookup', adController.lookup)
adRouter.post('/update', adController.update)
adRouter.post('/delete', adController.delete)
adRouter.post('/pickup', adController.pickup)

module.exports = adRouter;
