var express = require('express');
var router = express.Router();
var loginModel = require('../models/login.js');

router.post('/addUser', function (req, res) {
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
        needOption:req.body.needOption
    });
    newUser.save(function (err, data) {
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

//workout載入
router.get('/getposeList', function(req, res) {
    workoutModel.find(function(err, data) {
        if (err) {
            console.log(err);
        }
        res.json(data); //將資料回應給前端
    });
});

// //workout點擊更新
// router.post('/updateposeClick', function(req, res) {
//     var id = req.body.id;
//     console.log(id);
//     workoutModel.findById(id, function(err, data) {
//         if (err) {
//             console.log(err);
//         } else {
//             // data.click = req.body.click+1;
//             // console.log(data.click);
//             // data.save(function(err) {
//             //     if (err) {
//             //         console.log(err);
//             //     }
//             // });
//             console.log(2);
//         }
//     });
// });

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