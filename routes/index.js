var express = require('express');
var router = express.Router();
var workoutModel = require('../models/workout.js');

/* GET home page. */
router.get('/', function(req, res, next) {
    var img1, img2, img3;
    var max = 0;
    workoutModel.find(function(err, data) {
        img1 = data[Math.floor(Math.random() * data.length)].img;
        for (var i = 0; i < data.length; i++) {
            if (max < data[i].click) {
                max = data[i].click;
                img2 = data[i].img;
            }
        }
        img3 = data[Math.floor(Math.random() * data.length)].img;
        console.log(img1, img2, img3, 1);
        res.render('index', {
            img1: { img: img1 },
            img2: { img: img2 },
            img3: { img: img3 }
        });
    });
});

module.exports = router;