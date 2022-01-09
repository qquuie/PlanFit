// $(".dropdown-item").click(function() {
//     var workout_part = $(this).text();
// });

function getCookie(c_name) {
    var c_value = " " + document.cookie;
    var c_start = c_value.indexOf(" " + c_name + "=");
    if (c_start == -1) {
        c_value = null;
    } else {
        c_start = c_value.indexOf("=", c_start) + 1;
        var c_end = c_value.indexOf(";", c_start);
        if (c_end == -1) {
            c_end = c_value.length;
        }
        c_value = unescape(c_value.substring(c_start, c_end));
    }
    return c_value;
}

/*--------------------------------生成workout_div--------------------------------------*/



function getPose(p) {
    window.localStorage.setItem('pose', p);
    window.localStorage.setItem('find', 0);
}

getposeList();

function getposeList() {
    if (getCookie('needOption') != null) {
        var focus = getCookie('needOption');
        var needarr = new Array();
        var dataneed = new Array(3);
        needarr = focus.split(",");
        for (var i = 0; i < needarr.length; i++) {
            if (needarr[i] == "Lose weight") {
                dataneed[0] = 1;
            }
            if (needarr[i] == "Gain muscle") {
                dataneed[1] = 1;
            }
            if (needarr[i] == "Get fitter") {
                dataneed[2] = 1;
            }
        }
    }

    var api = "http://127.0.0.1:3000/api/getposeList";

    var p = {
            pose: window.localStorage.getItem('pose'),
            find: window.localStorage.getItem('find'),
        }
        // console.log(p.pose);
    var tmp = [];
    jQuery.post(api, p, function(data) {
        // console.log(data);
        if (getCookie('needOption') != null) {
            var pose = new Array(data.length);
            for (let i = 0; i < data.length; i++) {
                pose[i] = 0;
                if (data[i].need[0] == dataneed[0]) {
                    pose[i]++;
                }
                if (data[i].need[1] == dataneed[1]) {
                    pose[i]++;
                }
                if (data[i].need[2] == dataneed[2]) {
                    pose[i]++;
                }
                pose[i] = pose[i] * 1000 + data[i].click;
                data[i].num = pose[i];
                tmp.push(data[i]);
                tmp.sort(function(a, b) {
                    return b.num - a.num
                });

            }
        } else {
            for (let i = 0; i < data.length; i++) {
                tmp.push(data[i]);
                tmp.sort(function(a, b) {
                    return b.click - a.click
                });

            }
        }
        for (let i = 0; i < data.length; i++) {
            newList(tmp[i], i, data.length - 1);
        }
    });

}

var tmp = "";

function newList(data, i, end) {
    var col_num = parseInt(i / 3);
    if (i % 3 == 0) {
        $('.totalPose').append(`<div class="card-group card_row${col_num} text-center"></div>`);
    }
    var e = (data.equipment) ? "Yes" : "No";
    var j = (data.Jumping) ? "Yes" : "No";
    tmp =
        `<div class="card border-GreenLake">
                <div class="card-header">
                    <ul class="nav nav-tabs card-header-tabs">
                        <li class="nav-item">
                            <a class="nav-link">
                                <img src="img/icon_see_times.png" width="20px">
                                <p id="see_times${data._id}">${data.click}</p>
                            </a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link folder" onclick="workoutFolder('${data.name}')" id="workoutFolder">
                                <img class="workoutFolder" src="img/icon_folder.png" width="25px">
                            </a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link calender"  onclick="updateposeClick('${data._id}','${data.name}')">
                                <img src="img/icon_calender.png" width="20px">
                            </a>
                        </li>
                    </ul>
                </div>
                <img class="card-img-top" src="${data.img}" alt="Card image cap">
                <div class="card-body text-GreenLake">
                    <h3 class="card-title">${data.name}</h3>
                    <p class="card-text">
                        Difficulty:${data.level}/5 <br>
                        equipment:${e} <br>
                        Jumping:${j}
                    </p>
                </div>
            </div>`
    $('.card_row' + col_num).append(tmp);
    // const workout_modal=`

    // `;
    // $('body').append(workout_modal)

    // $('.card-img-top').click(function () {
    //     var itemId = $(this).attr('id');
    //     const tmp = $(this).parent().find('a.nav-link>p');
    //     var img_id=tmp.attr('id').split('see_times')[1]
    //     console.log(img_id)

    // })
}
var choice_d = []; //存放所有選擇日期陣列
var choice_d_arr = [];
var choice; //選擇某格日期
var pre_click_ym; //之前的年月(用來記錄當All被按下時，是否已經換月)
var now_click_ym; //現在的年月(用來記錄當All被按下時，是否已經換月)
var change = true; //判斷是否已經按下過該格子
var workout_list = []; //儲存"使用者儲存的運動項目&日期&次數秒數的物件"的陣列
var workout_item = {}; //"使用者儲存的運動項目&日期&次數秒數"的物件
var workout_sth_c = ""; //運動名稱
var workout_times; //運動次數或秒數
var workout_times_status = "times";
var same = false; //判斷是否有存取過該運動
var sameID = -1; //有存取過該運動，紀錄該運動在陣列中的索引值

getUserCal(); //User一開始登入的日曆

//User一開始登入的日曆
function getUserCal() {
    choice_d = []; //清空陣列
    workout_item = {};
    workout_list = [];
    same = false; //判斷是否有存取過該運動
    sameID = -1; //有存取過該運動，紀錄該運動在陣列中的索引值
    //是:讀取該物件的日期陣列，並把他們加入choice_d裡面，其該位置表格也要變色
    //---------------------------------------------------------初始化-------------------------------
    var api = "http://127.0.0.1:3000/api/getUserCal";
    var data = {
        acc: getCookie('username')
    };
    jQuery.post(api, data, function(res) { //抓後端資料
        //-----------------------------------------日曆初始化-------------------------------
        // console.log(res);
        for (var i = 0; i < res.length; i++) {
            if (res[i].day != "") { //日期不為空
                workout_item = {
                    workout_sth_c: res[i].title,
                    workout_times: res[i].times,
                    choice_day: res[i].day,
                    acc: res[i].acc, //使用者名稱
                    workout_times_status: res[i].times_status
                }
                workout_list.push(workout_item);
            }
        }
    });

}

function workout_cal_choice(name) {
    var api = "http://127.0.0.1:3000/api/workoutCalChoice"; //除非跨域
    var data1 = {
        "acc": getCookie('username'),
        "title": name,
    }; //這邊給值//更改click+1
    // console.log(data1);
    jQuery.post(api, data1, function(res) { //抓後端資料
        console.log(res);
        if (res.length == 0) {
            console.log(1);
        } else {
            console.log(2);
        }
        // workout_sth_c = res.name; //存取點擊的運動名稱
        // // console.log("JQ:"+workout_sth_c);
        // $("#modal_workout_name p").text(workout_sth_c); /*資料庫*/

        // $("td").removeClass("important"); //把所有特效清空
        // for (var i = 0; i < res.length; i++) {
        //     // console.log("workout_sth_c陣列:"+workout_list[i].workout_sth_c);
        //     // console.log("workout_sth_c單個:"+workout_sth_c);
        //     if (workout_sth_c == workout_list[i].workout_sth_c) { //有存取過該運動
        //         // console.log("已存取過運動名稱:"+workout_list[i].workout_sth_c);
        //         workout_times = workout_list[i].workout_times;
        //         workout_times_status = workout_list[i].workout_times_status;
        //         // console.log(workout_times + workout_times_status);
        //         $("#modal_block input").val(workout_times);
        //         $("#modal_block #times p").text(workout_times_status);
        //         same = true;
        //         sameID = i
        //         choice_d = workout_list[i].choice_day.split(','); //當前日期陣列的值=資料庫物件裡面日期陣列的值
        //         console.log(choice_d);
        //         var Days = document.getElementsByTagName("td");
        //         for (var k = 0; k <= 41; k++) {
        //             for (var j = 0; j < choice_d.length; j++) {
        //                 if ($(Days[k]).attr("data-uid") == choice_d[j]) {
        //                     $(Days[k]).addClass("important");
        //                     break;
        //                 }
        //             }
        //         }
        //         // console.log(workout_list[i].choice_d);
        //         // console.log(choice_d);
        //         break;
        //     }
        // }
        // console.log("same:" + same);
        window.localStorage.setItem('newpose', name);
    });
}

//更新待辦事項//前端
function updateposeClick(id, name) {
    // console.log(getCookie('username'));
    if (getCookie('username') == '') {
        alert("Sign in! Please!!");
    }
    $("#calendar_win").show(); //顯示視窗
    $("#cal_win").show(); //顯示視窗
    same = false; //判斷是否有存取過該運動
    sameID = -1; //有存取過該運動，紀錄該運動在陣列中的索引值
    console.log(workout_list);
    // console.log(id);
    var api = "http://127.0.0.1:3000/api/updateposeClick"; //除非跨域
    var data = {
        "id": id,
        "click": parseInt($('#see_times' + id).text()) + 1,
    }; //這邊給值//更改click+1
    //---------------------------------------------------------初始化End----------------------------
    //----------------------------------------------------------------//
    jQuery.post(api, data, function(res) { //抓後端資料
        $('#see_times' + id).text(data.click);
    });

    workout_cal_choice(name);
    //----------------------------------------------------------------//


    //----------------------------------------------------------------//
    //---------------------------------------------------------初始化End----------------------------
    //-------------------------------for迴圈判斷workout_list的物件裡面是否有該運動名稱

}

$('.home_cal').click(function() {
    change = true;
    choice = $(this).attr("data-uid");
    for (let value of choice_d) {
        if (value == choice) {
            change = false;
            break;
        } else {
            change = true;
        }
    }
    if ($(this).hasClass("important") == false && change == true) {
        $(this).addClass("important");
        choice_d.push(choice); //儲存選擇年月日-->推入陣列
    } else if (change == false) {
        $(this).removeClass("important");
        // var ind = choice_d.indexOf(choice);
        for (let value of choice_d) {
            if (value == choice) {
                var ind = choice_d.indexOf(choice);
                choice_d.splice(ind, 1);
                break;
            }
        }
    }
    console.log(choice_d);
});

$("#modal_OK").click(function() {
    console.log("choice_d的長度:" + choice_d.length);
    //還要判斷曾經選擇過&&未選擇日期)
    var $ff = $(this).parent();
    workout_times = $ff.find("#input_num").val();
    workout_times_staus = $ff.find("#times p").text();
    if (choice_d.length == 0) { //未選擇日期
        alert("No date selected");
    } else if (workout_times == "") {
        alert("No times or second selected");
    } else { //存取過
        alert(workout_sth_c + " is saved in calendar");
        $("#modal_block").hide(); //視窗關閉
        //把時間資料放進字串
        for (var i = 0; i < choice_d.length; i++) {
            if (choice_d != "" && i < choice_d.length) { //如果陣列裡有數值
                choice_day += choice_d[i];
                if (i == choice_d.length - 1) {
                    break;
                }
                choice_day += ',';
            }
        }
        console.log(choice_day);
        // console.log(workout_times);
        // console.log(workout_sth_c);
        console.log(choice_d);
        // console.log("次數或秒數:"+workout_times+workout_times_staus);
        if (same == true) { // && workout_list[sameID].workout_times==workout_times-->
            //只要改變選擇日期
            workout_list[sameID].choice_day = choice_day;
            workout_list[sameID].workout_times = workout_times;
            workout_list[sameID].workout_times_status = workout_times_status;
            workout_list[sameID].workout_sth_c = window.localStorage.getItem('newpose');
            console.log(sameID + ":" + workout_times + workout_times_status);

            var API = "http://127.0.0.1:3000/api/workoutcal";
            var Data = workout_list[sameID]; //選擇之動作
            console.log(Data);

            jQuery.post(API, Data, function(res) { //抓後端資料
                $("#modal_block input").val(''); //資料清空
                $("#modal_block #times p").text('times');
            });
            // console.log(workout_list);
            //之後將存放這些資料的變數清空
        } else if (same == false) {
            console.log(choice_day);
            workout_item = {
                workout_sth_c: window.localStorage.getItem('newpose'),
                workout_times: workout_times,
                workout_times_status: workout_times_status,
                choice_day: choice_day,
                acc: getCookie('username') //使用者名稱
            }
            workout_list.push(workout_item);

            var api = "http://127.0.0.1:3000/api/addNew_workoutcal";
            var data = workout_item; //選擇之動作
            console.log(data);

            jQuery.post(api, data, function(res) { //抓後端資料
                $("#modal_block input").val(''); //資料清空
                $("#modal_block #times p").text('times');
                // workout_item = {
                //         workout_sth_c: res.title,
                //         workout_times: res.times,
                //         choice_day: res.day,
                //         acc: res.acc, //使用者名稱
                //         workout_times_status: res.times_status
                //     }
                //     workout_list.push(workout_item);
            });
            // console.log(workout_list);
            //之後將存放這些資料的變數清空
        }
    }
    choice_d = []; //清空陣列
    console.log(choice_d);
});



//---------------------------------------------------------abbyEND-------------------------------
$("#calender_close").click(function() {
    choice_d = [];
});



let workout_sth = "";
/*--------------------------------folder--------------------------------------*/

/*--------------------------------calender--------------------------------------*/
// $(".calender").click(function() {
//     $("#calendar_win").show();
//     $("#calendar_win").css({ "display": "flex", "flex-direction": "column" });
// });


$("div#smallPageModal").css('z-index', '-1');
$(".page").css('z-index', '1000');
$(".calender").click(function() {
    $("#calendar_win").show();
    $("#calendar_win").css({
        "display": "flex",
        "flex-direction": "column"
    });
});


//------
// $(".calender").click(function() {
//     $("#cal_win").show();
//     $("#cal_win").css({ "display": "flex", "flex-direction": "column" });
// });


$("div#smallPageModal").css('z-index', '-1');
$(".page").css('z-index', '1000');
// $(".calender").click(function() {
//     $("#cal_win").show();
//     $("#cal_win").css({ "display": "flex", "flex-direction": "column" });
// });

$('#find').click(function() {
    if ($('#findtxt').val() == "") {
        alert("無法查詢");
    } else {
        window.localStorage.setItem('pose', $('#findtxt').val());
        window.localStorage.setItem('find', 1);
        location.reload();

    }
});