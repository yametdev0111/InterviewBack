module.exports.uploadFiles = (req, res) => {
  console.log(req.files);
  res.json({
    result: true,
    data: req.files.map(val => val.filename)
  })
}