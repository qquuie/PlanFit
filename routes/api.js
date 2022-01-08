var express = require('express');
var router = express.Router();
var loginModel = require('../models/login.js');
var workoutModel = require('../models/workout.js');
var folderModel = require('../models/folder.js');
var calendarModel = require('../models/calendar.js');
var bcrypt = require('bcryptjs');
const createHttpError = require('http-errors');

router.post('/addUser', function(req, res) {
    // const body = _.pick(req.body, ['sex'])
    var newUser = new loginModel({
        acc: req.body.acc,
        pw: req.body.pw,
        email: req.body.email,
        birth: req.body.birth,
        sex: req.body.sex,
        height: req.body.height,
        weight: req.body.weight,
        age: req.body.age,
        focusOption: req.body.focusOption,
        needOption: req.body.needOption
    });
    loginModel.countDocuments({
        acc: req.body.acc
    }, async function(err, data) {

        if (data > 0) {
            res.json({
                "status": 1,
                "msg": "Account already exits!"
            });
        } else {
            const salt = await bcrypt.genSalt(8);
            const hashpw = await req.body.pw;
            newUser.pw = bcrypt.hashSync(hashpw, salt);
            newUser.save(function(err, data) {
                if (err) {
                    res.json({
                        "status": 1,
                        "msg": "error"
                    });
                    console.log(err)
                } else {
                    res.json({
                        "status": 0,
                        "msg": "success",
                        "data": data
                    });
                }
            })
        }

    });
});

//登入畫面擷取所有資料
router.post('/getUser', async function(req, res) {
    const {
        acc,
        pw
    } = req.body;
    loginModel.findOne({
        acc
    }, async function(err, data) {
        if (data == null) {
            res.json({
                "status": 1,
                "msg": "You are not our menber yet!"
            });
        } else {
            const isPw = await bcrypt.compare(req.body.pw, data.pw);
            if (!isPw) {
                res.json({
                    "status": 1,
                    "msg": "Your account or passwordwas wrong!"
                });
            }
            // console.log(data)
            res.json({
                "status": 0,
                "msg": "success",
                "data": data
            });
        }

    });
});

router.post('/getInfor', function(req, res) {
    // var id = req.body.acc;
    loginModel.find({
        acc: req.body.acc
    }, function(err, data) {
        if (err) console.log(err);
        // console.log(data);
        res.json({
            data
        })

    })
});
router.post('/changeInfor', function(req, res) {

    loginModel.findOne({
        acc: req.body.acc
    }, async function(err, data) {
        if (err) console.log(err);
        else {
            const salt = await bcrypt.genSalt(8);
            const hashpw = await req.body.newpw;
            data.pw = bcrypt.hashSync(hashpw, salt);

            // data.pw = req.body.newpw;
            data.email = req.body.newemail;
            data.birth = req.body.newbirth;
            data.sex = req.body.newsex;
            data.height = req.body.newheight;
            data.weight = req.body.newweight;
            data.age = req.body.newage;
            data.focusOption = req.body.newfocusOption;
            data.needOption = req.body.newneedOption;
            // console.log(data);

            data.save(function(err) {
                if (err) console.log(err);
                // console.log(data);
                res.json({
                    data
                })
            })

        }
    })
});
//workout載入


router.post('/getposeList', function(req, res) {
    if (req.body.find == 1) {
        workoutModel.find({
            name: { $regex: req.body.pose }
        }, function(err, data) {
            for (var i = 0; i < data.length; i++) {
                data[i].status = true;
                data[i].save(function(err) {
                    if (err) {
                        console.log(err);
                    }
                });
            }
            if (err) {
                console.log(err);
            }
            res.json(data); //將資料回應給前端
        });
    } else {
        workoutModel.find({
            class_pose: req.body.pose
        }, function(err, data) {
            if (err) {
                console.log(err);
            }
            res.json(data); //將資料回應給前端
        });
    }

});

//workout點擊更新//後端
router.post('/updateposeClick', function(req, res) {
    var id = req.body.id;
    // console.log(req.body);
    workoutModel.findById(id, function(err, data) {
        if (err) {
            console.log(err);
        } else {
            // console.log(req.body.click);
            data.click = req.body.click;
            // console.log(data);
            data.save(function(err) {
                if (err) {
                    console.log(err);
                } else {
                    res.json(data);
                }
            });
        }
    });
});

router.post('/listfile', function(req, res) {
    // folderModel.find({
    //     acc: req.body.acc,
    //     status: true
    // }, function(err, data) {
    //     for (var i = 0; i < data.length; i++) {
    //         data[i].status = false;
    //         data[i].save(function(err, data) {});
    //     }
    // });

    folderModel.find({
        acc: req.body.acc
    }, function(err, data) {
        res.json(data); //將資料回應給前端
    });
});

//新增文件夾
router.post('/addFolder', function(req, res) {
    folderModel.find({
        title: req.body.title,
        status: false,
        acc: req.body.acc
    },function(err, data) {
        if (err) {
            console.log(err);
        } else {
            res.json(data);
        }
    })
});

router.post('/removeFolder', function(req, res) {
    folderModel.remove({
        _id: req.body.id
    }, function(err, data) {
        res.json(data); //將資料回應給前端
    });
});
router.post('/removeList', function(req, res) {
    folderModel.remove({
        _id: req.body.id
    }, function(err, data) {
        res.json(data); //將資料回應給前端
    });
});
// router.post('/FolderList', function (req, res) {
//     folderModel.find({
//         acc: req.body.acc,
//         title:req.body.folder
//     }, function(err, data) {
//         res.json(data); //將資料回應給前端
//         console.log(data);
//     });
// });

router.post('/workoutcal', function(req, res) {
    // console.log(req.body);
    var status = true;
    console.log(req.body.workout_sth_c);
    console.log(req.body.acc);
    calendarModel.find({
        title: req.body.workout_sth_c,
        acc: req.body.acc
    }, function(err, data) {
        data[0].times = req.body.workout_times;
        data[0].day = req.body.choice_d;
        data[0].title = req.body.workout_sth_c;
        // console.log(data[0]);
        data[0].save(function(err, data) {});
        res.json(data[0]); //將資料回應給前端
    });
});

router.post('/getUserCal', function(req, res) {
    // console.log(req.body);
    // var status=true;
    // console.log(req.body.workout_sth_c);
    // console.log(req.body.acc);
    calendarModel.find({
        acc: req.body.acc
    }, function(err, data) {
        res.json(data); //將資料回應給前端
        // console.log(data);
    });
});

router.post('/addPose', function(req, res) {
    var newpose = new folderModel({
        title: req.body.folder,
        pose: req.body.pose,
        status: false,
        acc: req.body.acc
    });

    newpose.save(function(err, data) {
        if (err) {
            console.log(err);
        } else {
            res.json(data);
        }
    });
});

router.post('/listpose', function(req, res) {
    folderModel.find({
        acc: req.body.acc,
        title: req.body.folder
    }, function(err, data) {
        res.json(data); //將資料回應給前端

    });
});

router.post('/getindexwheel', function(req, res) {
    workoutModel.find({
        name: req.body.pose
    }, function(err, data) {
        res.json(data); //將資料回應給前端
    });
});

module.exports = router;