var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('navigation', { title: 'Express' });
});
router.get('/about', function(req, res, next) {
  res.render('about', { title: 'Express' });
});
router.get('/aboutG', function(req, res, next) {
  res.render('aboutG', { title: 'Express' });
});
router.get('/infor', function(req, res, next) {
  res.render('infor', { title: 'Express' });
});
router.get('/indexG', function(req, res, next) {
  res.render('indexG', { title: 'Express' });
});
router.get('/workoutG', function(req, res, next) {
  res.render('workoutG', { title: 'Express' });
});
router.get('/workout', function(req, res, next) {
  res.render('workout', { title: 'Express' });
});
router.get('/index', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
module.exports = router;
