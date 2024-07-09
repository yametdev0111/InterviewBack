const express = require('express')

const questionRouter = express.Router()
const { questionController } = require('../controllers')

questionRouter.post('/create', questionController.create)
questionRouter.post('/lookup', questionController.lookup)
questionRouter.post('/update', questionController.update)
questionRouter.post('/delete', questionController.delete)

module.exports = questionRouter;
