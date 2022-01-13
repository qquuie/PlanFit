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
                    <ul class="nav nav-tabs card-header-tabs ">
                        <li class="nav-item">
                            <a class="nav-link">
                                <img src="img/icon_see_times.png" width="20px" >
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
                        <li class="nav-item">
                        <button class="btn mt-1" style="width: 45px;height: 42px;" onclick="showModal('${data._id}','${data.describe}')" data-toggle='modal' data-bs-target='#workoutModalID' >
                        <i class="bi bi-collection"> <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-collection" viewBox="0 0 16 16">
                        <path d="M2.5 3.5a.5.5 0 0 1 0-1h11a.5.5 0 0 1 0 1h-11zm2-2a.5.5 0 0 1 0-1h7a.5.5 0 0 1 0 1h-7zM0 13a1.5 1.5 0 0 0 1.5 1.5h13A1.5 1.5 0 0 0 16 13V6a1.5 1.5 0 0 0-1.5-1.5h-13A1.5 1.5 0 0 0 0 6v7zm1.5.5A.5.5 0 0 1 1 13V6a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-.5.5h-13z"/>
                        </svg></i></button>
                        </a>
                    </li>
                    </ul>
                </div>
                <img class="card-img-top" src="${data.img}" alt="Card image cap" >
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

}

function showModal(_ID, describe) {
    console.log(_ID)
    console.log(describe)

    $('#workoutModalIDdiv').removeClass('fade')
    $('#workoutModalID').removeClass('fade')
    $('#workoutModalIDdiv').css('z-index', '1050')
    $('#workoutModalID').css('z-index', '1050')
    $("div#workoutModalID").modal("toggle");
    $('div.modal-body>p').html(describe);

}

function showModalHome(id) {
    console.log(id)
    console.log()
    var namePose = $('#' + id).parent().parent().find('#pose_name').text()
    var api = "http://127.0.0.1:3000/api/showModalHome";
    jQuery.post(api, { 'name': namePose }, function(res) {
        if (res.status == 0) {
            console.log(res.data);
            $('div.modal-body>p').html(res.data.describe);

        }
    })
    $('#workoutModalIDdiv').removeClass('fade')
    $('#workoutModalID').removeClass('fade')
    $('#workoutModalIDdiv').css('z-index', '1050')
    $('#workoutModalID').css('z-index', '1050')
    $("div#workoutModalID").modal("toggle");
    // $('div.modal-body>p').html(describe);

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



// var have = [];
// var havearr = [];
// var num_day = [];
var totalarr = [];

function workout_cal_choice(name) {
    num_day = [];
    var api = "http://127.0.0.1:3000/api/workoutCalChoice"; //除非跨域
    var data1 = {
        "acc": getCookie('username'),
        "title": name,
    };
    jQuery.post(api, data1, function(res) { //抓後端資料
        console.log(res.length);
        // var tmpA = new Array();
        if (res.length != 0) {
            same = true;
            for (var i = 0; i < res.length; i++) {
                if (res[i].day.search(',') != -1) {
                    var tmp = res[i].day.split(',');
                    for (var j = 0; j < tmp.length; j++) {
                        have.push(tmp[j]); //當前日期陣列的值=資料庫物件裡面日期陣列的值
                    }
                } else {
                    have.push(res[i].day);
                }
            }

            havearr = have.filter(function(ele, pos) {
                return have.indexOf(ele) == pos;
            });
        }
    });

    var API = "http://127.0.0.1:3000/api/HOMEdataChoice"; //除非跨域
    var DATA = {
        "acc": getCookie('username'),
    };
    jQuery.post(API, DATA, function(res) {
        for (var i = 0; i < havearr.length; i++) {
            num_day[i] = 0;
        }

        for (var i = 0; i < havearr.length; i++) {
            for (var j = 0; j < have.length; j++) {
                if (have[j] == havearr[i]) {
                    num_day[i]++;
                }
            }
        }

        var n = havearr.length - 1;
        for (var i = 0; i < res.length; i++) {
            havearr.push(res[i].day);
        }
        totalarr = havearr.filter(function(ele, pos) {
            return havearr.indexOf(ele) == pos;
        });
        for (var i = n; i < totalarr.length; i++) {
            num_day[i] = 0;
        }
        console.log(totalarr);
        console.log(num_day);

        for (var i = 0; i < res.length; i++) {
            for (var j = 0; j < totalarr.length; j++) {
                if (res[i].day == totalarr[j]) {
                    if (res[i].inputS.search(',') != -1) {
                        var sth = res[i].inputS.split(',');
                        num_day[j] += sth.length;
                    } else {
                        num_day[j]++;
                    }
                }
            }
        }
        console.log(num_day);

        var Days = document.getElementsByTagName("td");
        for (var k = 0; k <= 41; k++) {
            for (var j = 0; j < totalarr.length; j++) {
                if ($(Days[k]).attr("data-uid") == totalarr[j]) {
                    if (num_day[j] <= 3) {
                        $(Days[k]).addClass("have_s");
                    } else if (num_day[j] > 3 && num_day[j] < 7) {
                        $(Days[k]).addClass("have_m");
                    } else {
                        $(Days[k]).addClass("have_h");
                    }
                    break;
                }
            }
        }
    });
    have = [];
    havearr = [];
    // num_day = [];
}

function nextMonth() {
    $("td").removeClass("important"); //先把效果清除
    pre_click_ym = getMonthName(thisMonth) + ", " + thisYear; //上一次的日曆頁面
    thisMonth++;
    if (thisMonth === 12) {
        thisMonth = 0;
        thisYear++;
    }
    now_click_ym = getMonthName(thisMonth) + ", " + thisYear; //現在的日曆頁面
    $("#cal-month").text(now_click_ym);
    let firstDay = new Date(thisYear, thisMonth, 1).getDay();
    console.log(pre_click_ym);
    console.log(now_click_ym);
    fillInMonth(thisYear, thisMonth, thisDate);

    var Days = document.getElementsByTagName("td");
    for (var i = 0; i <= 41; i++) {
        // console.log($(Days[i]).attr("data-uid"));
        for (var j = 0; j < choice_d.length; j++) {
            if ($(Days[i]).attr("data-uid") == choice_d[j]) {
                console.log($(Days[i]).attr("data-uid") + "," + choice_d[j]);
                $(Days[i]).addClass("important");
                break;
            }
        }
    }
    console.log(1);
    var Days = document.getElementsByTagName("td");
    for (var k = 0; k <= 41; k++) {
        for (var j = 0; j < totalarr.length; j++) {
            $(Days[k]).removeClass("have_s");
            $(Days[k]).removeClass("have_m");
            $(Days[k]).removeClass("have_h");
        }
    }

    for (var k = 0; k <= 41; k++) {
        for (var j = 0; j < totalarr.length; j++) {
            if ($(Days[k]).attr("data-uid") == totalarr[j]) {
                if (num_day[j] <= 3) {
                    $(Days[k]).addClass("have_s");
                } else if (num_day[j] > 3 && num_day[j] < 7) {
                    $(Days[k]).addClass("have_m");
                } else {
                    $(Days[k]).addClass("have_h");
                }
                break;
            }
        }
    }
}

function previousMonth() {
    $("td").removeClass("important"); //先把效果清除
    pre_click_ym = getMonthName(thisMonth) + ", " + thisYear; //上一次的日曆頁面
    thisMonth--;
    if (thisMonth === -1) {
        thisMonth = 11;
        thisYear--;
    }
    now_click_ym = getMonthName(thisMonth) + ", " + thisYear; //現在的日曆頁面
    $("#cal-month").text(now_click_ym);
    let firstDay = new Date(thisYear, thisMonth, 1).getDay();
    console.log(pre_click_ym);
    console.log(now_click_ym);
    fillInMonth(thisYear, thisMonth, thisDate);

    var Days = document.getElementsByTagName("td");
    //清空陣列再把所有data-uid的數值推入
    //應寫成把該月的所有刪掉而不是直接清空(直接會導致其他月份都清空)
    for (var i = 0; i <= 41; i++) {
        // console.log($(Days[i]).attr("data-uid"));
        for (var j = 0; j < choice_d.length; j++) {
            if ($(Days[i]).attr("data-uid") == choice_d[j]) {
                console.log($(Days[i]).attr("data-uid") + "," + choice_d[j]);
                $(Days[i]).addClass("important");
                break;
            }
        }
    }

    for (var k = 0; k <= 41; k++) {
        for (var j = 0; j < totalarr.length; j++) {
            $(Days[k]).removeClass("have_s");
            $(Days[k]).removeClass("have_m");
            $(Days[k]).removeClass("have_h");
        }
    }

    for (var k = 0; k <= 41; k++) {
        for (var j = 0; j < totalarr.length; j++) {
            if ($(Days[k]).attr("data-uid") == totalarr[j]) {
                if (num_day[j] <= 3) {
                    $(Days[k]).addClass("have_s");
                } else if (num_day[j] > 3 && num_day[j] < 7) {
                    $(Days[k]).addClass("have_m");
                } else {
                    $(Days[k]).addClass("have_h");
                }
                break;
            }
        }
    }
}

//更新待辦事項//前端
function updateposeClick(id, name) {
    // console.log(getCookie('username'));
    if (getCookie('username') == null) {
        alert("Sign in! Please!!");
    } else {
        $("#calendar_win").show(); //顯示視窗
        $("#cal_win").show(); //顯示視窗
        same = false; //判斷是否有存取過該運動
        // sameID = -1; //有存取過該運動，紀錄該運動在陣列中的索引值
        // console.log(workout_list);
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

        var Days = document.getElementsByTagName("td");
        for (var j = 0; j < Days.length; j++) {
            $(Days[j]).removeClass("important");
            $(Days[j]).removeClass("have_s");
            $(Days[j]).removeClass("have_m");
            $(Days[j]).removeClass("have_h");
        }
        // choice_d = [];
        // console.log(choice_d);
        workout_cal_choice(name);
        //----------------------------------------------------------------//
        window.localStorage.setItem('newpose', name);
        //----------------------------------------------------------------//
        //---------------------------------------------------------初始化End----------------------------
        //-------------------------------for迴圈判斷workout_list的物件裡面是否有該運動名稱
    }


}

$('.home_cal').click(function() {
    change = true;
    choice = $(this).attr("data-uid"); //得到選擇的日期
    for (let value of choice_d) {
        if (value == choice) { //choice_d裡面的值會不會等於你選擇的日期
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
});



function Nextdialog() {
    if (choice_d.length == 0) { //未選擇日期
        alert("No date selected");
    } else {
        $("#modal_block").show();
        $("#calendar_win").hide();
        $('#modal_workout_name>p').text(window.localStorage.getItem('newpose'));
    }
}


$("#modal_OK").click(function() {
    console.log("choice_d的長度:" + choice_d.length);
    //還要判斷曾經選擇過&&未選擇日期)
    var $ff = $(this).parent(); //input
    workout_times = $ff.find("#input_num").val();
    workout_times_status = $ff.find("#times p").text();
    if (workout_times == "") {
        alert("No times or second selected");
    } else { //存取過
        alert(window.localStorage.getItem('newpose') + " is saved in calendar");
        $("#modal_block").hide(); //視窗關閉
        //把時間資料放進字串
        choice_day = "";
        for (var i = 0; i < choice_d.length; i++) {
            choice_day += choice_d[i];
            if (i == choice_d.length - 1) {
                break;
            }
            choice_day += ',';
        }
        // console.log(choice_day);
        // console.log(workout_times);
        // console.log(workout_sth_c);
        // console.log(choice_d);
        // console.log("次數或秒數:"+workout_times+workout_times_staus);
        if (same == true) { // && workout_list[sameID].workout_times==workout_times-->
            var API = "http://127.0.0.1:3000/api/workoutcal";
            var Data = {
                    acc: getCookie('username'),
                    title: window.localStorage.getItem('newpose'),
                    day: choice_day,
                    times: workout_times,
                    times_status: workout_times_status,
                }
                // console.log(Data);

            jQuery.post(API, Data, function(res) { //抓後端資料
                $("#modal_block input").val(''); //資料清空
                $("#modal_block #times p").text('times');
            });
        } else if (same == false) {
            console.log(choice_day);
            workout_item = {
                workout_sth_c: window.localStorage.getItem('newpose'),
                workout_times: workout_times,
                workout_times_status: workout_times_status,
                choice_day: choice_day,
                acc: getCookie('username') //使用者名稱
            }

            var api = "http://127.0.0.1:3000/api/addNew_workoutcal";
            var data = workout_item; //選擇之動作
            console.log(data);

            jQuery.post(api, data, function(res) { //抓後端資料
                $("#modal_block input").val(''); //資料清空
                $("#modal_block #times p").text('times');
            });
        }
    }
    choice_d = []; //清空陣列

});

/*--------------------------------calender--------------------------------------*/


$("div#smallPageModal").css('z-index', '-1');
$(".page").css('z-index', '1000');
$(".calender").click(function() {
    console.log(1);
    // $("#cal-month").text(getMonthName(thisMonth) + ", " + thisYear);
    $("#calendar_win").show();
    $("#calendar_win").css({
        "display": "flex",
        "flex-direction": "column"
    });
});

$('#find').click(function() {
    if ($('#findtxt').val() == "") {
        alert("Nothing to find");
    } else {
        window.localStorage.setItem('pose', $('#findtxt').val());
        window.localStorage.setItem('find', 1);
        location.reload();
    }
});