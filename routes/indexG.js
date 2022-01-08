var express = require('express');
var router = express.Router();
var workoutModel = require('../models/workout.js');

/* GET home page. */
router.get('/', function(req, res, next) {
    var img1, img2, img3;
    var id1, id2, id3;
    var name1, name2, name3;
    var max = 0;
    workoutModel.find(function(err, data) {
        var tmp = Math.floor(Math.random() * data.length);
        id1 = data[tmp]._id;
        name1 = data[tmp].name;
        img1 = data[tmp].img;

        for (var i = 0; i < data.length; i++) {
            if (max < data[i].click) {
                max = data[i].click;
                tmp = i;
            }
        }
        id2 = data[tmp]._id;
        img2 = data[tmp].img;
        name2 = data[tmp].name;

        tmp = Math.floor(Math.random() * data.length);
        id3 = data[tmp].img;
        img3 = data[tmp].img;
        name3 = data[tmp].name;

        res.render('indexG', {
            img1: {
                id: id1,
                name: name1,
                img: img1
            },
            img2: {
                id: id2,
                name: name2,
                img: img2
            },
            img3: {
                id: id3,
                name: name3,
                img: img3
            }
        });
    });
});

module.exports = router;