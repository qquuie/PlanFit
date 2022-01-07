// 使用if來取得週天的名稱
// function getWeekdayName(weekday){ 
//   var weekdayName;
//   if (weekday === 0 ) weekdayName = "Sunday";
//   if (weekday === 1 ) weekdayName = "Monday";
//   if (weekday === 2 ) weekdayName = "Tuesday";
//   if (weekday === 3 ) weekdayName = "Wednesay";
//   if (weekday === 4 ) weekdayName = "Thursday";
//   if (weekday === 5 ) weekdayName = "Friday";
//   if (weekday === 6 ) weekdayName = "Saturay";
//   return weekdayName;
// }
//---------------------------------------初始化變數---------------------------------------------------
var choice_d = []; //存放所有選擇日期陣列
var choice; //選擇某格日期
var pre_click_ym; //之前的年月(用來記錄當All被按下時，是否已經換月)
var now_click_ym; //現在的年月(用來記錄當All被按下時，是否已經換月)
var change = true; //判斷是否已經按下過該格子
var workout_list = []; //儲存"使用者儲存的運動項目&日期&次數秒數的物件"的陣列
var workout_item = {}; //"使用者儲存的運動項目&日期&次數秒數"的物件
var workout_sth_c = ""; //運動名稱
var workout_times; //運動次數或秒數
var same = false; //判斷是否有存取過該運動
var sameID = -1; //有存取過該運動，紀錄該運動在陣列中的索引值

//抓取cookie
function getUSerCookie() {
    var tmp = getCookie('username');
    $('h4#welcome').text('Wellcome ' + tmp);
}

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

// //記事圖示與ToolTip處理
// // 記事資料的程式片段
// var postIts = []; //記事陣列，用來放置月曆中的記事物件資料
// //current 目前點擊的日期
// var currentPostItID = 0; //目前的記事ID
// var newCurrentPostIt = false; //目前的記事是否為新？也就是：目前點選的日期尚未有任何的記事資料
// var currentPostItIndex = 0; //目前的記事在postIts陣列中的位置索引
// function appendSpriteToCellAndTooltip(uid, elem){      
//   for(let i = 0; i < postIts.length; i++){
//     if(uid == postIts[i].id){
//       elem.innerHTML += `<img src='images/note${postIts[i].note_num}.png' alt='A post-it note'>`;
//       elem.classList.add("tooltip");
//       elem.innerHTML += `<span>${postIts[i].note}</span>`;
//     }
//   }
// }

function fillInMonth(thisYear, thisMonth, thisDate) {
    let firstDayThisMonthYear = new Date(thisYear, thisMonth, 1).getDay();
    // 填滿月曆表格日期
    var days = document.getElementsByTagName("td"); //取得月曆表格html所有的TD標籤物件陣列
    var monthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]; //記錄每個月的天數
    if (thisYear % 400 == 0 || (thisYear % 4 == 0 && thisYear % 100 != 0)) {
        monthDays[1] = 29; //閏年的話，2月為29天
    }

    var uid;
    //填本月的天數，從1到本月的最後一天(取本月的天數)
    for (let i = 1; i <= monthDays[thisMonth]; i++) {
        uid = getUID(thisYear, thisMonth, i);
        // console.log(uid);
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
        d--;
    }
    if (firstDayThisMonthYear > 0) days[firstDayThisMonthYear - 1].classList.add("prev-month-last-day");

    var nextMonth = thisMonth + 1;
    //填下月的天數，從1到最後1格    
    for (let i = firstDayThisMonthYear + monthDays[thisMonth], d = 1; i <= 41; i++, d++) {
        if (nextMonth == 12) {
            uid = getUID(thisYear + 1, 0, d);

        } else {
            uid = getUID(thisYear, nextMonth, d);
        }
        // console.log(uid);
        days[i].innerHTML = d;
        days[i].setAttribute("data-uid", uid);
    }

}
// ----------------------------------表格日期END-----------------------------------//
// ----------------------------------標題年月END-----------------------------------//

// ----------------------------------月曆按鈕按下-----------------------------------//
function Nextdialog() {
    $("#modal_block").show();
    $("#calendar_win").hide();
}

function Alldialog() {
    var Days = document.getElementsByTagName("td");
    //清空陣列再把所有data-uid的數值推入
    //應寫成把該月的所有刪掉而不是直接清空(直接會導致其他月份都清空)
    for (var i = 0; i <= 41; i++) {
        for (var j = 0; j < choice_d.length; j++) {
            if ($(Days[i]).attr("data-uid") == choice_d[j]) {
                //choice_d[j]從陣列中移除
                choice_d.splice(j, 1);
            }
        }
    }
    //將該月所有資料推進陣列
    if ($("td").hasClass("important") == false) {
        $("td").addClass("important");
        //儲存選擇年月日-->推入陣列
        for (var i = 0; i <= 41; i++) {
            choice_d.push($(Days[i]).attr("data-uid"));
            //console.log($(Days[i]).attr("data-uid")); 
        }
    } else if ($("td").hasClass("important") == true) {
        $("td").removeClass("important");
    }
    console.log(choice_d);
}

var clock = 0;
$("#times").click(function() {
    if (clock % 2 == 0) {
        $(this).find("p").text("sec");
    } else {
        $(this).find("p").text("times");
    }
    clock++;
});
$("#modal_back").click(function() {
    $("#calendar_win").show();
    $("#modal_block").hide();
});
$("#calender_close").click(function() {
    $("#calendar_win").hide();
});
/*--------------------------------------以下為要存的資料------------------------------*/
//----------------------------------------按下日期格子----------------------------------
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
//紀錄運動名稱
$(".calender").click(function() {
    //---------------------------------------------------------初始化-------------------------------
    choice_d = [];
    same = false; //判斷是否有存取過該運動
    sameID = -1; //有存取過該運動，紀錄該運動在陣列中的索引值
    //是:讀取該物件的日期陣列，並把他們加入choice_d裡面，其該位置表格也要變色
    var $father = $(this).parent().parent().parent().parent();
    workout_sth_c = $father.find(".card-body h3").text();
    $("#modal_workout_name p").text(workout_sth_c);
    console.log(workout_sth_c);

    $("td").removeClass("important");
    //---------------------------------------------------------初始化End----------------------------
    //-------------------------------for迴圈判斷workout_list的物件裡面是否有該運動名稱
    for (var i = 0; i < workout_list.length; i++) {
        if (workout_sth_c == workout_list[i].workout_sth_c) { //有存取過該運動
            console.log("已存取過運動名稱:" + workout_list[i].workout_sth_c);
            same = true;
            sameID = i;
            choice_d = workout_list[i].choice_d; //當前日期陣列的值=資料庫物件裡面日期陣列的值

            var Days = document.getElementsByTagName("td");
            for (var k = 0; k <= 41; k++) {
                for (var j = 0; j < choice_d.length; j++) {
                    if ($(Days[k]).attr("data-uid") == choice_d[j]) {
                        $(Days[k]).addClass("important");
                        break;
                    }
                }
            }
            console.log(workout_list[i].choice_d);
            console.log(choice_d);
            break;
        }
    }
});
//按下確定後，紀錄該運動的日期陣列、運動名稱、運動次數或秒數-->存進物件
$("#modal_OK").click(function() {
    $("#modal_block").hide(); //視窗關閉

    var $ff = $(this).parent();
    workout_times = $ff.find("#input_num").val() + $ff.find("#times p").text();
    // console.log(workout_times);
    // console.log(workout_sth_c);
    console.log(choice_d);
    if (same == true) { // && workout_list[sameID].workout_times==workout_times-->
        //只要改變選擇日期
        workout_list[sameID].choice_d = choice_d;
        workout_list[sameID].workout_times = workout_times;
    } else if (same == false) {
        workout_item = {
            workout_sth_c: workout_sth_c,
            workout_times: workout_times,
            choice_d: choice_d,
            acc:getCookie('username')
        }
        workout_list.push(workout_item);

    }

    var choice_d_arr = new Array();
    for(var i=0;i<workout_item.choice_d[i].length;i++){
        
    }

    var api = "http://127.0.0.1:3000/api/workoutcal";

    var data = workout_list[0]; //選擇之動作
    // console.log(data);
    jQuery.post(api, data, function (res) {});

    // console.log(workout_item);
    // console.log(workout_list);
    //之後將存放這些資料的變數清空
});