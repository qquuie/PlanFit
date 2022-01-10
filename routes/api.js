var express = require('express');
var router = express.Router();
var loginModel = require('../models/login.js');
var workoutModel = require('../models/workout.js');
var folderModel = require('../models/folder.js');
var calendarModel = require('../models/calendar.js');
var HOMEinputModel = require('../models/HOMEinput.js');
//HOMEinput.js
var bcrypt = require('bcryptjs');
const createHttpError = require('http-errors');

router.post('/HOMEload', function(req, res) {
    HOMEinputModel.find({
        acc: req.body.acc,
        day: req.body.day
    }, function(err, data) {
        res.json(data); //將資料回應給前端
    });
});

router.post('/removeHOME', function(req, res) {
    HOMEinputModel.find({
        day: req.body.day,
        acc: req.body.acc
    }, function(err, data) {
        var sth = data[0].inputS.split(',');
        
        for (let value of sth) {
            console.log(sth);
            console.log(value);
            if (value == req.body.inputS) {
                var ind = sth.indexOf(req.body.inputS);
                console.log(ind);
                sth.splice(ind, 1);
                data[0].inputS = sth.toString();
                break;
            }
        }
        data[0].save(function(err) {
            if (err) {
                console.log(err);
            }
        });
        res.json(data);
        console.log(data[0].inputS,44);
    });
    HOMEinputModel.remove({inputS: ""},function(err, data){
        console.log(11111111111);
        console.log(data);
        if(err){

        }else{
            console.log("remove!!!");
            
        }
    }); 
});

router.post('/HomeUpdate', function(req, res) {
    console.log(req.body.acc);
    console.log(req.body.day);
    console.log(req.body.inputS);
    var same = false;
    HOMEinputModel.find({ //找尋相同姿勢&帳號
        day: req.body.day,
        acc: req.body.acc
    }, function(err, data) {
        // console.log(data.length);
        for (var i = 0; i < data.length; i++) {
            if (req.body.day == data[i].day) {
                data[i].inputS += ",";
                data[i].inputS += req.body.inputS;
                console.log(data[i].inputS);
                data[i].save(function(err) {});
                same = true;
                break;
            }
        }
        if (same == false) {
            console.log("new");
            var new_HOMEinput = new HOMEinputModel({
                acc: req.body.acc,
                day: req.body.day,
                inputS: req.body.inputS
            });
            new_HOMEinput.save(function(err, data) {});
        }
        res.json(data); //將資料回應給前端
    });
});

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
                "msg": "You are not our member yet!"
            });
        } else {
            const isPw = await bcrypt.compare(req.body.pw, data.pw);
            if (!isPw) {
                res.json({
                    "status": 1,
                    "msg": "Your account or password was wrong!"
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
                }
            });
            res.json(data);
        }
    });
});

router.post('/listfile', function(req, res) {
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
    }, function(err, data) {
        if (err) {
            console.log(err);
        } else {
            res.json(data);
        }
    })
});

router.post('/removeFolder', function(req, res) {
    folderModel.remove({
        title: req.body.title
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

router.post('/removeworkoutCal', function(req, res) {
    console.log(req.body.title);
    calendarModel.find({
        acc: req.body.acc,
        title: req.body.title
        // title: req.body.title
    }, function(err, data) {
        var sth = data[0].day.split(',');
        sth = sth.filter(function(item) {
            return item != req.body.day
        });
        data[0].day = sth.toString(); 
        data[0].save(function(err) {
            if (err) {
                console.log(err);
            }
        });
        res.json(data); //將資料回應給前端
    });
});

router.post('/workoutcal', function(req, res) {
    console.log(req.body);
    var same = false;
    calendarModel.find({ //找尋相同姿勢&帳號
        title: req.body.title,
        acc: req.body.acc
    }, function(err, data) {
        console.log(data.length);
        for (var i = 0; i < data.length; i++) {
            if (req.body.times == data[i].times && req.body.times_status == data[i].times_status) {
                var tmp = data[i].day + ',' + req.body.day;
                var arr = tmp.split(",");
                var finalarr = arr.filter(function(ele, pos) {
                    return arr.indexOf(ele) == pos;
                });
                data[i].day = finalarr.toString();
                data[i].save(function(err) {
                    if (err) {
                        console.log(err);
                    }
                });
                same = true;
                break;
            }
        }
        if (!same) {
            var new_workout = new calendarModel({
                title: req.body.title,
                acc: req.body.acc,
                times: req.body.times,
                times_status: req.body.times_status,
                day: req.body.day
            });
            // console.log(new_workout, 296);
            new_workout.save(function(err, data) {
                if (err) {
                    console.log(err);
                }
            });
        }
        res.json(data); //將資料回應給前端
    });
});

router.post('/workoutCalChoice', function(req, res) {
    calendarModel.find({
        acc: req.body.acc,
        // title: req.body.title
    }, function(err, data) {
        if (err) {
            console.log(err);
        }
        res.json(data); //將資料回應給前端
    });
});


router.post('/addNew_workoutcal', function(req, res) {
    // console.log("req.body.times_staus:" + req.body.workout_times_status);
    // console.log("req.body.times:" + req.body.workout_times);
    // console.log("req.body.choice_d:" + req.body.choice_day);
    // console.log("req.body.title:" + req.body.workout_sth_c);
    var new_workout = new calendarModel({
        title: req.body.workout_sth_c,
        acc: req.body.acc,
        times: req.body.workout_times,
        times_status: req.body.workout_times_status,
        day: req.body.choice_day
    });
    // console.log(new_workout, 296);
    new_workout.save(function(err, data) {
        if (err) {
            console.log(err);
        } else {
            res.json(data);
        }
    });
});

router.post('/getUserCal', function(req, res) {
    calendarModel.find({
        acc: req.body.acc
    }, function(err, data) {
        res.json(data); //將資料回應給前端
        console.log(data);
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

router.post('/getPose', function(req, res) {
    workoutModel.findOne({
        id: req.body.acc
    }, async function(err, data) {

    });
});

router.post('/getindexwheel', function(req, res) {
    workoutModel.find({
        name: req.body.pose
    }, function(err, data) {
        res.json(data); //將資料回應給前端
    });
});

router.post('/HOMEgetWorkoutName', function(req, res) {
    console.log(req.body.acc);
    calendarModel.find({ //找尋相同姿勢&帳號
        acc: req.body.acc //只要找到a的資料
    }, function(err, data) {
        for (var i = 0; i < data.length; i++) {
            data[i].save(function(err) {
                if (err) {
                    console.log(err);
                }
            });
        }
        res.json(data); //將資料回應給前端
        console.log(data);
    });
});

module.exports = router;