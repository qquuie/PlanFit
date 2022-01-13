//---------------------------------------初始化變數---------------------------------------------------
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

//每換一頁日曆就要先removeclass，再判斷一次陣列裡面的data-uid的數值後去改變css
// 使用陣列來取得週天的名稱
function getWeekdayName(weekday) {
    var weekdayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    return weekdayNames[weekday];
}
//取得月份
function getMonthName(month) {
    switch (month) {
        case 0:
            return "Jan";
        case 1:
            return "Feb";
        case 2:
            return "Mar";
        case 3:
            return "Apr";
        case 4:
            return "May";
        case 5:
            return "Jun";
        case 6:
            return "Jul";
        case 7:
            return "Aug";
        case 8:
            return "Sep";
        case 9:
            return "Oct";
        case 10:
            return "Nov";
        case 11:
            return "Dec";
    }
}

// ----------------------------------標題年月-----------------------------------//
function updateDates() {
    //新增一個Date物件，命名為today
    $("#cal-month").text(getMonthName(thisMonth) + ", " + thisYear);
    $("#home_cal-month").text(getMonthName(thisMonth) + ", " + thisYear);
    workout_cal_choiceH();

}

function previousMonth() {

    $(".cal").removeClass("important"); //先把效果清除
    $(".HOME_cal").removeClass("important"); //先把效果清除
    thisMonth--;
    if (thisMonth === -1) {
        thisMonth = 11;
        thisYear--;
    }

    $("#cal-month").text(getMonthName(thisMonth) + ", " + thisYear);
    // $("#home_cal-month").text(getMonthName(thisMonth) + ", " + thisYear);
    // let firstDay = new Date(thisYear, thisMonth, 1).getDay();
    fillInMonth(thisYear, thisMonth, thisDate);

    var Days = document.getElementsByClassName("cal");
    //清空陣列再把所有data-uid的數值推入
    //應寫成把該月的所有刪掉而不是直接清空(直接會導致其他月份都清空)
    for (var i = 0; i <= 41; i++) {
        // console.log($(Days[i]).attr("data-uid"));
        for (var j = 0; j < choice_d.length; j++) {
            if ($(Days[i]).attr("data-uid") == choice_d[j]) {
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

function previousMonthH() {
    $(".cal").removeClass("important"); //先把效果清除
    $(".HOME_cal").removeClass("important"); //先把效果清除
    thisMonthH--;
    if (thisMonthH === -1) {
        thisMonthH = 11;
        thisYearH--;
    }

    // $("#cal-month").text(getMonthName(thisMonth) + ", " + thisYear);
    $("#home_cal-month").text(getMonthName(thisMonthH) + ", " + thisYearH);
    // let firstDay = new Date(thisYear, thisMonth, 1).getDay();
    fillInMonth(thisYearH, thisMonthH, thisDateH);

    var Days = document.getElementsByTagName("td");
    //清空陣列再把所有data-uid的數值推入
    //應寫成把該月的所有刪掉而不是直接清空(直接會導致其他月份都清空)
    for (var i = 0; i <= 41; i++) {
        // console.log($(Days[i]).attr("data-uid"));
        for (var j = 0; j < choice_d.length; j++) {
            if ($(Days[i]).attr("data-uid") == choice_d[j]) {
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

function nextMonth() {
    $(".cal").removeClass("important"); //先把效果清除
    $(".HOME_cal").removeClass("important"); //先把效果清除
    thisMonth++;
    if (thisMonth === 12) {
        thisMonth = 0;
        thisYear++;
    }
    $("#cal-month").text(getMonthName(thisMonth) + ", " + thisYear);
    // $("#home_cal-month").text(getMonthName(thisMonth) + ", " + thisYear);
    let firstDay = new Date(thisYear, thisMonth, 1).getDay();
    fillInMonth(thisYear, thisMonth, thisDate);

    var Days = document.getElementsByClassName("cal");
    //清空陣列再把所有data-uid的數值推入
    //應寫成把該月的所有刪掉而不是直接清空(直接會導致其他月份都清空)
    for (var i = 0; i <= 41; i++) {
        for (var j = 0; j < choice_d.length; j++) {
            if ($(Days[i]).attr("data-uid") == choice_d[j]) {
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

    // workout_cal_choiceH(window.localStorage.getItem('newpose'));
}

function nextMonthH() {
    $(".cal").removeClass("important"); //先把效果清除
    $(".HOME_cal").removeClass("important"); //先把效果清除
    thisMonthH++;
    if (thisMonthH === 12) {
        thisMonthH = 0;
        thisYearH++;
    }
    // $("#cal-month").text(getMonthName(thisMonth) + ", " + thisYear);
    $("#home_cal-month").text(getMonthName(thisMonthH) + ", " + thisYearH);
    let firstDay = new Date(thisYearH, thisMonthH, 1).getDay();
    fillInMonth(thisYearH, thisMonthH, thisDateH);

    var Days = document.getElementsByTagName("td");
    for (var i = 0; i <= 41; i++) {
        for (var j = 0; j < choice_d.length; j++) {
            if ($(Days[i]).attr("data-uid") == choice_d[j]) {
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

    // workout_cal_choiceH(window.localStorage.getItem('newpose'));
}
// ----------------------------------表格日期-----------------------------------//
function getUID(year, month, date) {
    if (month < 10) {
        month = '0' + month; //如果數字是1位數的話，前面補0
    }
    if (date < 10) {
        date = '0' + date;
    }
    return '' + year + month + date;
}

function fillInMonth(thisYear, thisMonth, thisDate) {
    let firstDayThisMonthYear = new Date(thisYear, thisMonth, 1).getDay();
    // 填滿月曆表格日期
    var days = document.getElementsByClassName("HOME_cal"); //取得月曆表格html所有的TD標籤物件陣列
    var days_form = document.getElementsByClassName("cal"); //取得月曆表格html所有的TD標籤物件陣列
    var monthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]; //記錄每個月的天數
    if (thisYear % 400 == 0 || (thisYear % 4 == 0 && thisYear % 100 != 0)) {
        monthDays[1] = 29; //閏年的話，2月為29天
    }

    var uid;
    //填本月的天數，從1到本月的最後一天(取本月的天數)
    for (let i = 1; i <= monthDays[thisMonth]; i++) {
        uid = getUID(thisYear, thisMonth, i);
        // console.log(uid);
        days_form[i + firstDayThisMonthYear - 1].innerHTML = i;
        days_form[i + firstDayThisMonthYear - 1].setAttribute("data-uid", uid);
        days[i + firstDayThisMonthYear - 1].innerHTML = i;
        days[i + firstDayThisMonthYear - 1].setAttribute("data-uid", uid);
    }

    //填上月的天數，從上個月的最後1天開始遞減地填
    let lastMonth = thisMonth - 1;
    if (lastMonth === -1) lastMonth = 11; //1月的"上個月"是12月
    let d = monthDays[lastMonth];

    for (let i = firstDayThisMonthYear - 1; i >= 0; i--) {
        if (lastMonth == 11) {
            uid = getUID(thisYear - 1, lastMonth, d);

        } else {
            uid = getUID(thisYear, lastMonth, d);
        }
        // console.log(uid);
        // days[i].classList.add("not_important");
        // days[i].classList.remove("normal");
        days[i].innerHTML = d;
        days[i].classList.remove("prev-month-last-day");
        days[i].setAttribute("data-uid", uid);
        days_form[i].innerHTML = d;
        days_form[i].classList.remove("prev-month-last-day");
        days_form[i].setAttribute("data-uid", uid);
        d--;
    }
    if (firstDayThisMonthYear > 0) days[firstDayThisMonthYear - 1].classList.add("prev-month-last-day");
    if (firstDayThisMonthYear > 0) days_form[firstDayThisMonthYear - 1].classList.add("prev-month-last-day");


    var nextMonth = thisMonth + 1;
    //填下月的天數，從1到最後1格    
    for (let i = firstDayThisMonthYear + monthDays[thisMonth], d = 1; i <= 41; i++, d++) {
        if (nextMonth == 12) {
            uid = getUID(thisYear + 1, 0, d);

        } else {
            uid = getUID(thisYear, nextMonth, d);
        }
        days[i].innerHTML = d;
        days[i].setAttribute("data-uid", uid);
        days_form[i].innerHTML = d;
        days_form[i].setAttribute("data-uid", uid);
    }

}
// ----------------------------------表格日期END-----------------------------------//
// ----------------------------------標題年月END-----------------------------------//

// ----------------------------------月曆按鈕按下-----------------------------------//

function Nextdialog() {
    if (choice_d.length == 0) { //未選擇日期
        alert("No date selected");
    } else {
        $("#modal_block").show();
        $("#cal_win").hide();
        $('#modal_workout_name>p').text(window.localStorage.getItem('newpose'));
    }
}

function Alldialog() {
    var Days = document.getElementsByClassName("cal");
    //清空陣列再把所有data-uid的數值推入
    //應寫成把該月的所有刪掉而不是直接清空(直接會導致其他月份都清空)
    for (var i = 0; i <= 41; i++) {
        for (var j = 0; j < choice_d.length; j++) {
            // $(Days[i]).attr("data-uid")//在這裡更改當月
            if ($(Days[i]).attr("data-uid") == choice_d[j]) {
                //choice_d[j]從陣列中移除
                choice_d.splice(j, 1);
            }
        }
    }
    //將該月所有資料推進陣列
    if ($(".cal").hasClass("important") == false) {
        $(".cal").addClass("important");
        //儲存選擇年月日-->推入陣列
        for (var i = 0; i <= 41; i++) {
            choice_d.push($(Days[i]).attr("data-uid"));
        }
    } else if ($(".cal").hasClass("important") == true) {
        $(".cal").removeClass("important");
    }
}


/*--------------------------------------以下為要存的資料------------------------------*/

// getUserCal(); //User一開始登入的日曆

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


var have = [];
var havearr = [];
var num_day = [];
var totalarr = [];

function init() {
    var Days = document.getElementsByClassName("cal");

    for (var k = 0; k <= 41; k++) {
        $(Days[k]).removeClass("have_s");
        $(Days[k]).removeClass("have_m");
        $(Days[k]).removeClass("have_h");
    }

    Days = document.getElementsByTagName("td");

    for (var k = 0; k <= 41; k++) {
        $(Days[k]).removeClass("have_s");
        $(Days[k]).removeClass("have_m");
        $(Days[k]).removeClass("have_h");
    }
}

function workout_cal_choiceH() {

    init();

    var api = "http://127.0.0.1:3000/api/workoutCalChoice"; //除非跨域
    var data = {
        "acc": getCookie('username'),
    };
    jQuery.post(api, data, function(res) { //抓後端資料
        var tmp = new Array();
        if (res.length != 0) {
            same = true;
            for (var i = 0; i < res.length; i++) {
                if (res[i].day.search(',') != -1) {
                    tmp = res[i].day.split(',');
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

    var api1 = "http://127.0.0.1:3000/api/HOMEdataChoice"; //除非跨域
    var data1 = {
        "acc": getCookie('username'),
    };
    jQuery.post(api1, data1, function(res) {
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

        var Days = document.getElementsByClassName("cal");

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

        Days = document.getElementsByTagName("td");

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
    num_day = [];
}



//----------------------------------------按下日期格子----------------------------------
$('.cal').click(function() {
    console.log(360);
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
    } else {
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
//首頁日曆跳出視窗
// $("#cal_win").click(function() {
//     //---------------------------------------------------------初始化-------------------------------
//     choice_d=[];
//     same=false;//判斷是否有存取過該運動
//     sameID=-1;//有存取過該運動，紀錄該運動在陣列中的索引值
//     //是:讀取該物件的日期陣列，並把他們加入choice_d裡面，其該位置表格也要變色
//     workout_sth_c = $("#pose_name").text();
//     $("#modal_workout_name p").text(workout_sth_c);
//     console.log(workout_sth_c);

//     $(".cal").removeClass("important");
//     //---------------------------------------------------------初始化End----------------------------
//     //-------------------------------for迴圈判斷workout_list的物件裡面是否有該運動名稱
//     for(var i=0;i<workout_list.length;i++){
//         if(workout_sth_c==workout_list[i].workout_sth_c){//有存取過該運動
//             console.log("已存取過運動名稱:"+workout_list[i].workout_sth_c);
//             same=true;
//             sameID=i;
//             choice_d=workout_list[i].choice_d;//當前日期陣列的值=資料庫物件裡面日期陣列的值

//             var Days = document.getElementsByClassName("cal");
//             for (var k = 0; k <= 41; k++) {
//                 for(var j=0;j<choice_d.length;j++){
//                     if($(Days[k]).attr("data-uid")==choice_d[j]){
//                         $(Days[k]).addClass("important");
//                         break;
//                     }
//                 } 
//             }
//             console.log(workout_list[i].choice_d);
//             console.log(choice_d);
//             break;
//         }
//     }
// });
//紀錄運動名稱

$(".calender").click(function() {
    console.log(1);
    if (getCookie('username') == "") {
        PleaseSign();
    } else {
        workout_sth_c = $("#pose_name").text();
        $("#cal_win").show();
        if (getCookie('username') == null) {
            alert("Sign in! Please!!");
        }
        $("#cal_win").show(); //顯示視窗
        same = false; //判斷是否有存取過該運動
        var Days = document.getElementsByClassName("td");
        for (var j = 0; j < Days.length; j++) {
            $(Days[j]).removeClass("important");
            $(Days[j]).removeClass("have_s");
            $(Days[j]).removeClass("have_m");
            $(Days[j]).removeClass("have_h");
        }
        // workout_cal_choice(workout_sth_c);
        //----------------------------------------------------------------//
        window.localStorage.setItem('newpose', workout_sth_c);
    }
});

$("#modal_OK_home").click(function() {
    var $ff = $(this).parent(); //input
    workout_times = $ff.find("#input_num").val();
    workout_times_status = $ff.find("#times p").text();
    if (workout_times == "") {
        alert("No times or second selected");
    } else { //存取過
        alert(window.localStorage.getItem('newpose') + " is saved in calendar");
        $("#modal_block").hide(); //視窗關閉
        choice_day = "";
        for (var i = 0; i < choice_d.length; i++) {
            choice_day += choice_d[i];
            if (i == choice_d.length - 1) {
                break;
            }
            choice_day += ',';
        }
        if (same == true) { // && workout_list[sameID].workout_times==workout_times-->
            var API = "http://127.0.0.1:3000/api/workoutcal";
            var Data = {
                acc: getCookie('username'),
                title: workout_sth_c,
                day: choice_day,
                times: workout_times,
                times_status: workout_times_status,
            }

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

            jQuery.post(api, data, function(res) { //抓後端資料
                $("#modal_block input").val(''); //資料清空
                $("#modal_block #times p").text('times');
            });
        }
    }
    choice_d = []; //清空陣列
    workout_cal_choiceH();
});



//----------------------------------------------------------------------------
var choice_home_cal; //
// var homecalID; //首頁表格
var choiceDayWorkout = []; //物件陣列，物件裡放運動名稱
var choiceDay; //點擊的日期
var data_input = "";
var dataDay = [];

// HOMEgetWorkoutName();

function HOMEgetWorkoutName() {
    var api = "http://127.0.0.1:3000/api/HOMEgetWorkoutName";
    var data = {
        acc: getCookie('username')
    };

    jQuery.post(api, data, function(res) { //抓後端資料
        var Days = document.getElementsByClassName(".HOME_cal");
        for (var i = 0; i < res.length; i++) {
            if (getCookie('username') == res[i].acc) { //找帳號
                choiceDay = res[i].day.split(','); //把日期存入陣列
                // console.log(choiceDay);
                // for(var j = 0;j < res.length;j++){
                //     if(choiceDay[j]==)
                // }
            }
        }
    });
}

$(document).ready(function() {
    $(".HOME_cal").click(function() {
        $("#HOME_div").show();
        $("#HOME_div_block").empty();
        if ($(this).hasClass("important") == false) {
            $(".HOME_cal").removeClass("important");
            choice_home_cal = $(this).attr("data-uid");
            // homecalID = $(this).attr("data-uid"); //哪一格
            $(this).addClass("important");
        }
        var api = "http://127.0.0.1:3000/api/HOMEgetWorkoutName";
        var data = {
            acc: getCookie('username')
        };
        choiceDay = $(this).attr("data-uid"); //請放在jQuery.post外面才能讀數值!!!
        jQuery.post(api, data, function(res) { //抓後端資料
            dataWorkout = ""; //要先清空
            // $("#HOME_div_block").empty(); //要先清空
            for (var i = 0; i < res.length; i++) {
                if (res[i].day.search(choiceDay) != -1) {
                    if (res[i].inputS != '') {
                        console.log(1);
                        var sth = res[i].title + "," + res[i].times + "," + res[i].times_status;
                        // var title = res[i].title.split(',');
                        // var titleArr = "";
                        // for (var j = 0; j < title.length; j++) {
                        //     titleArr += title[j];
                        // }
                        var HOMEdiv = `  <div class="HOME_item i${i}">
                                        <input type="text" value="${res[i].title}" class="col-6 no-border">
                                        <input type="text" value="${res[i].times}" class="col-1 no-border">
                                        <input type="text" value="${res[i].times_status}" class="col-2 no-border">
                                        <div class="HOME_item_delete col-2" onclick="HOMEdel('i${i}','2','${sth}')">X</div>
                                    </div>`
                        $("#HOME_div_block").append(HOMEdiv);
                    }

                    // <div class="HOME_item_name">
                    //                         ${sth}
                    //                     </div>
                }
            }
        });
        var API = "http://127.0.0.1:3000/api/HOMEload";
        var Data = {
            acc: getCookie('username'),
            day: choiceDay
        };
        jQuery.post(API, Data, function(res) { //抓後端資料
            var sth = [];
            if (res.length > 0) { //該日期有資料
                if (res[0].inputS.search(',') != -1) {
                    sth = res[0].inputS.split(',');
                } else {
                    sth[0] = res[0].inputS;
                }
                for (var i = 0; i < sth.length; i++) {
                    // if (res[i].inputS != "") {
                    var HOMEdiv = `  <div class="HOME_item ${sth[i]}">
                                        <div class="HOME_item_name">
                                            ${sth[i]}
                                        </div>
                                        <div class="HOME_item_delete" onclick="HOMEdel('${sth[i]}','1','0')">X</div>
                                    </div>`;
                    $("#HOME_div_block").append(HOMEdiv);
                    // }
                }
            }
        });
    });
    $("#modal_back").click(function() {
        console.log("#modal_back");
        //$("#calendar_win").show();
        $("#cal_win").show();
        $("#modal_block").hide();
    });
    // $("#modal_OK").click(function() {
    //     console.log("#modal_OK");
    //     $("#modal_block").hide();
    //     $(".cal").removeClass("important");
    // });
    $("#cal_close").click(function() {
        console.log("#cal_close");

        $("#cal_win").hide();
        //$("#calendar_win").hide();
    });
    //按下back
    $("#HOME_sth_back").click(function() {
        $("#HOME_div").show();
        $("#HOME_model").hide();
    });
    //按下X
    $("#HOME_div_close").click(function() {
        $("#HOME_div_block").empty(); //清空
        $("#HOME_div").hide();
        $("#HOME_sth_input").val("");
    });

    $(".no-border").attr("readonly", true); //取消唯讀狀態
    $(".no-border").addClass('d-none');
});


function HOMEdel(HOMEinput, ind, title) {
    $('.' + HOMEinput).remove();
    if (ind == '1') {
        var api = "http://127.0.0.1:3000/api/removeHOME";
        var data = {
            acc: getCookie('username'),
            day: choiceDay,
            inputS: HOMEinput
        };
        jQuery.post(api, data, function(res) {});
        del(1);
    } else {
        var api1 = "http://127.0.0.1:3000/api/removeCal";
        var sth = title.split(',')
        var data1 = {
            acc: getCookie('username'),
            day: choiceDay,
            inputS: sth[0],
            times: sth[1],
            times_status: sth[2]
        };
        jQuery.post(api1, data1, function(res) {});
        del(2);
    }
    workout_cal_choiceH();
}


// //按下add else +
$("#HOME_item_add").click(function() {
    $("#HOME_model").show();
    $("#HOME_div").hide();
});
// 按下add
$("#HOME_sth_add").click(function() {
    if ($("#HOME_sth_input").val() == "") {
        alert("You don't input pose!");
    } else {
        alert('add new pose!');
        var HOMEinput = $("#HOME_sth_input").val();
        var HOMEdiv = `  <div class="HOME_item ${HOMEinput}">
                            <div class="HOME_item_name">
                                ${HOMEinput}
                            </div>
                            <div class="HOME_item_delete" onclick="HOMEdel('${HOMEinput}','1','0')" >X</div>
                        </div>`;
        $("#HOME_div_block").append(HOMEdiv);

        var API = "http://127.0.0.1:3000/api/HomeUpdate";
        var Data = {
            acc: getCookie('username'),
            day: choiceDay,
            inputS: HOMEinput
        };
        jQuery.post(API, Data, function(res) {

        });
        $("#HOME_model").hide();
        $("#HOME_div").show();
    }
    $("#HOME_sth_input").val("");
    workout_cal_choiceH();
});



//按下刪除資料按鍵

function del(type) {
    var api = "http://127.0.0.1:3000/api/del";
    var data = {
        type: type
    };
    console.log(1);
    jQuery.post(api, data, function(res) {
        console.log(res);
    });
}

function PleaseSign() {
    alert("Sign in! Please!!");
}