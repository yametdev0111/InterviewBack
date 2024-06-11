const uploadRouter = require('./upload');
const adRouter = require('./ad');
const businessRouter = require('./business');
const influencerRouter = require('./influencer');

module.exports = app => {
  app.use('/ad', adRouter);
  app.use('/upload_files', uploadRouter);
  app.use('/business', businessRouter);
  app.use('/influencer', influencerRouter);
  
  app.get('/', (req, res) => {
    res.send('Welcome to GradePost backend server!!!')
  })
}