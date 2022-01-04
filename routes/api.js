var express = require('express');
var router = express.Router();
var loginModel = require('../models/login.js');
var workoutModel = require('../models/workout.js');

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
        focusOption: req.body.focusOption,
        needOption: req.body.needOption
    });
    newUser.save(function(err, data) {
        if (err) {
            res.json({
                "status": 1,
                // "msg": "error"
            });
            console.log("新增失敗");
        } else {
            res.json({
                "status": 0,
                // "msg": "success",
                "data": data
            });
            console.log("新增成功");
        }
    })
});

//登入畫面擷取所有資料
router.get('/getUser', function(req, res) {
    loginModel.find(function(err, data) {
        if (err) console.log(err);
        // console.log(res.json(data));
    })
});

//得到對應的列表
router.post('/getPose', function(req, res) {
    console.log(req.body);
    workoutModel.find({ 'class_pose': req.body.pose }, function(err, data) {
        if (err) {
            console.log(err);
        } else {
            console.log(data);
            data.status = true;
            // data.save(function(err) {
            //     if (err) {
            //         console.log(err);
            //     } else {
            //         // res.json(data);
            //     }
            // });
        }
        // res.json(data); //將資料回應給前端
    });
    // db..update(
    //     { age: { $gt: 25 } },
    //     { $set: { username: "John" } },   { multi: true }
    //  )
});

//workout載入
router.post('/getposeList', function(req, res) {
    workoutModel.find({ 'status': false }, function(err, data) {
        if (err) {
            console.log(err);
        }
        res.json(data); //將資料回應給前端
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

module.exports = router;