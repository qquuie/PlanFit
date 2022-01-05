var express = require('express');
var router = express.Router();
var loginModel = require('../models/login.js');
var workoutModel = require('../models/workout.js');
var folderModel = require('../models/folder.js');
var bcrypt = require('bcryptjs');

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

    newUser.save(function(err, data) {
        
        if (err) {
            res.json({
                "status": 1,
                "msg": "error"
            });
        } else {
            res.json({
                "status": 0,
                "msg": "success",
                "data": data
            });
        }
    })



});

//登入畫面擷取所有資料
router.post('/getUser', function(req, res) {
    loginModel.findOne({
        acc: req.body.acc,
        pw: req.body.pw

    }, function(err, data) {
        if (data == null) {
            res.json({
                "status": 1,
                "msg": "帳號密碼錯誤!"
            });
        } else if (err) {
            res.json({
                "status": 1,
                "msg": "error"
            });
        } else {
            res.json({
                "status": 0,
                "msg": "success",
                "data": data
            });
        }
    })
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
    }, function(err, data) {
        if (err) console.log(err);
        else {
            data.pw = req.body.newpw;
            data.email = req.body.newemail;
            data.birth = req.body.newbirth;
            data.sex = req.body.newsex;
            data.height = req.body.newheight;
            data.weight = req.body.newweight;
            data.age = req.body.newage;
            data.focusOption = req.body.newfocusOption;
            data.needOption = req.body.newneedOption;
            console.log(data);

            data.save(function(err) {
                if (err) console.log(err);
                console.log(data);
                res.json({
                    data
                })
            })

        }
    })
});
//workout載入

router.post('/getpose', function(req, res) {
    workoutModel.find({
        class_pose: req.body.pose
    }, function(err, data) {
        if (err) {
            console.log(err);
        }
        for (var i = 0; i < data.length; i++) {
            console.log(data[i], i);
            data[i].status = true;
            data[i].save(function(err) {
                if (err) {
                    console.log(err);
                }
            });
        }
        res.json(data); //將資料回應給前端
    });
});

router.post('/getposeList', function(req, res) {
    workoutModel.find({
        status: true
    }, function(err, data) {
        if (err) {
            console.log(err);
        }
        res.json(data); //將資料回應給前端
        for (var i = 0; i < data.length; i++) {
            console.log(data[i], i);
            data[i].status = false;
            data[i].save(function(err) {
                if (err) {
                    console.log(err);
                }
            });
        }
    });
});

//workout點擊更新//後端
router.post('/updateposeClick', function(req, res) {
    var id = req.body.id;
    console.log(req.body);
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

// //刪除待辦事項
// router.post('/removeList', function (req, res) {
//     // ...
// });

// // 改變待辦事項外觀設計
// router.post('/checkStatus', function (req, res) {
//     // ...
// });

//新增文件夾
router.post('/addFolder', function(req, res) {
    var newfolder = new folderModel({
        id: req.body.id,
        title: req.body.title,
        status: false
    });
    newfolder.save(function(err, data) {
        if (err) {
            res.json({
                "status": 1,
                "msg": "error"
            });
        } else {
            res.json({
                "status": 0,
                "msg": "success",
                "data": data
            });
        }
    })
});
router.get('/getFolder', function(req, res) {
    folderModel.find(function(err, data) {
        if (err) {
            console.log(err);
        }
        res.json(data); //將資料回應給前端
    });
});

module.exports = router;