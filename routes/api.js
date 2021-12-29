var express = require('express');
var router = express.Router();
var loginModel = require('../models/login.js');
var workoutModel = require('../models/workout.js');
// var allList = []; //存放所有待辦事項
// var id = 1; //紀錄待辦事項的索引值
router.post('/addUser', function(req, res) {
    var newTodo = new loginModel({
        acc: req.body.acc,
        pw: req.body.pw,
        status: false
    });
    newTodo.save(function(err, data) {
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
        console.log(res.json(data));
    })
});

router.get('/getposeList', function(req, res) {
    workoutModel.find(function(err, data) {
        if (err) {
            console.log(err);
        }
        res.json(data); //將資料回應給前端
    });
});

// //修改與更新待辦事項
// router.post('/updateList', function (req, res) {
//     // ...
// });

// //刪除待辦事項
// router.post('/removeList', function (req, res) {
//     // ...
// });

// // 改變待辦事項外觀設計
// router.post('/checkStatus', function (req, res) {
//     // ...
// });

module.exports = router;