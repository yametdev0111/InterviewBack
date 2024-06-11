const express = require('express')

const { upload } = require("../config/multerConfig");

const uploadRouter = express.Router()
const { uploadController } = require('../controllers')

uploadRouter.post('/', upload.array('image', 3), uploadController.uploadFiles);

module.exports = uploadRouter;
