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
}

function previousMonth() {
    $(".cal").removeClass("important"); //先把效果清除
    thisMonth--;
    if (thisMonth === -1) {
        thisMonth = 11;
        thisYear--;
    }
    $("#cal-month").text(getMonthName(thisMonth) + ", " + thisYear);
    $("#home_cal-month").text(getMonthName(thisMonth) + ", " + thisYear);
    let firstDay = new Date(thisYear, thisMonth, 1).getDay();
    console.log(firstDay);
    fillInMonth(thisYear, thisMonth, thisDate);

    var Days = document.getElementsByClassName("cal");
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
    $(".cal").removeClass("important"); //先把效果清除
    thisMonth++;
    if (thisMonth === 12) {
        thisMonth = 0;
        thisYear++;
    }
    $("#cal-month").text(getMonthName(thisMonth) + ", " + thisYear);
    $("#home_cal-month").text(getMonthName(thisMonth) + ", " + thisYear);
    let firstDay = new Date(thisYear, thisMonth, 1).getDay();
    console.log(firstDay);
    fillInMonth(thisYear, thisMonth, thisDate);

    var Days = document.getElementsByClassName("cal");
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
    var days = document.getElementsByTagName("td"); //取得月曆表格html所有的TD標籤物件陣列
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
        // console.log(uid);
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
    $("#modal_block").show();
    $("#cal_win").hide();
    //$("#calendar_win").hide();
}

function Alldialog() {
    var Days = document.getElementsByClassName("cal");
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
    if ($(".cal").hasClass("important") == false) {
        $(".cal").addClass("important");
        //儲存選擇年月日-->推入陣列
        for (var i = 0; i <= 41; i++) {
            choice_d.push($(Days[i]).attr("data-uid"));
            //console.log($(Days[i]).attr("data-uid")); 
        }
    } else if ($(".cal").hasClass("important") == true) {
        $(".cal").removeClass("important");
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
    //$("#calendar_win").show();
    $("#cal_win").show();
    $("#modal_block").hide();
});
$("#modal_OK").click(function() {
    $("#modal_block").hide();
    $(".cal").removeClass("important");
});

$("#cal_close").click(function() {
    $("#cal_win").hide();
    //$("#calendar_win").hide();
});
/*--------------------------------------以下為要存的資料------------------------------*/
//----------------------------------------按下日期格子----------------------------------
$('.cal').click(function() {
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
    console.log(choice_d);
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

    console.log("如果有做介紹欄");
    // var api = "http://127.0.0.1:3000/api/updateposeClick"; //除非跨域
    // var data = {
    //     "id": id,
    //     "click": parseInt($('#see_times').text()) + 1,
    // }; //這邊給值//更改click+1
    // $('#see_times').text(data.click);
    // //---------------------------------------------------------初始化End----------------------------
    // //----------------------------------------------------------------//
    // jQuery.post(api, data, function(res) { //抓後端資料
    // console.log(res);
    // //---------------------------------------------------------日曆初始化-------------------------------
    // choice_d = [];
    // same = false; //判斷是否有存取過該運動
    // sameID = -1; //有存取過該運動，紀錄該運動在陣列中的索引值
    // //是:讀取該物件的日期陣列，並把他們加入choice_d裡面，其該位置表格也要變色
    // workout_sth_c = res.name;
    // // console.log(workout_sth_c);
    // $("#modal_workout_name p").text(workout_sth_c); /*資料庫*/

    // $("td").removeClass("important");
    // });
});
$("#modal_OK").click(function() {
    //存選擇的日期、運動名稱、運動次數或秒數-->存進物件
    //之後將存放這些資料的變數清空

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
            choice_d: choice_d
        }
        workout_list.push(workout_item);
    }
    console.log(workout_item);
    console.log(workout_list);
    //之後將存放這些資料的變數清空
});

//----------------------------------------------------------------------------
var choice_home_cal; //
var homecalID; //首頁表格
$(".home_cal").click(function() {
    if ($(this).hasClass("important") == false) {
        $(".home_cal").removeClass("important");
        choice_home_cal = $(this).attr("data-uid");
        homecalID = $(this).attr("data-uid"); //哪一格
        console.log(homecalID);
        $(this).addClass("important");
    }
});