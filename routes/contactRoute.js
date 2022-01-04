var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('contact', {
    title: 'information tab'
  });
});
// router.post('/infor', function(req, res, next) {
// res.send('success')  });

// sent email
router.post('/', function (req, res) {
  if (req.body.yourName === '' || req.body.yourEmail === '' || req.body.subject === '' || req.body.yourMes) {
    alert('Input cannot be blank!!');
  } else if (req.body.yourEmail.indexOf('@') < 0) {
    alert('Not a complete email!!');
  }

  var mailTransport = nodemailer.createTransport('SMTP', {
    service: 'Gmail',
    auth: {
      user: 'fitplan0112@gmail.com',
      pass: 'fitplan20220112'
    }
  });
  var mailOptions = {
    from: '"Plan Fit" <fitplan0112@gmail.com>',
    to: req.body.yourEmail,
    cc:'fitplan0112@gmail.com',
    subject: "Thanks for contacting us!",
    html: '<h1>' + req.body.yourName + '</h1><h3>You sent it to us, subject: ' + req.body.subject + '</h3><p>' + req.body.yourMes + '</p>'
  };
  mailTransport.sendMail(mailOptions, function (error, info) {
    if (error) {
      return console.log(err);
    }
    alert('Thanks for contacting us!');
  });

});
module.exports = router;