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
getposeList();

function getPose(p) {
    var api = "http://127.0.0.1:3000/api/getpose";
    // var pose = p;
    var data = {
        "pose": p,
    }; //選擇之動作
    jQuery.post(api, data, function(res) {});
    // console.log(data.pose);
    // getposeList(data.pose);
}



function getposeList() {
    // console.log(p);
    var focus = getCookie('needOption');
    // console.log(focus);
    var needarr = new Array();
    var dataneed = new Array(3);
    needarr = focus.split(",");
    // console.log(needarr);
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

    var api = "http://127.0.0.1:3000/api/getposeList";

    var tmp = [];
    jQuery.post(api, function(data) {
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
        // console.log(data);
        for (let i = 0; i < data.length; i++) {
            newList(tmp[i], i, data.length - 1);
        }
    });
}

var tmp = "";

function newList(data, i, end) {
    var col_num = parseInt(i / 3);
    if (i % 3 == 0) {
        $('.totalPose').append(`<div class="card-group card_row${col_num} text-center"><\div>`);
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
                            <a class="nav-link folder">
                                <img src="img/icon_folder.png" width="25px" >
                            </a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link calender"  onclick="updateposeClick('${data._id}')">
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
var string_choice_d = [];
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

getUserCal();//User一開始登入的日曆

//User一開始登入的日曆
function getUserCal(){
    choice_d = [];//清空陣列
    workout_item = {};
    workout_list = [];
    same=false;//判斷是否有存取過該運動
    sameID=-1;//有存取過該運動，紀錄該運動在陣列中的索引值
    //是:讀取該物件的日期陣列，並把他們加入choice_d裡面，其該位置表格也要變色
    //---------------------------------------------------------初始化-------------------------------
    var api = "http://127.0.0.1:3000/api/getUserCal";
    var data = {
        acc:getCookie('username')
    };
    jQuery.post(api, data, function (res) {//抓後端資料
        //-----------------------------------------日曆初始化-------------------------------
        // console.log(res);
        for(var i=0;i<res.length;i++){
            // console.log(res[i].acc);
            // console.log(res[i].day);
            // console.log(res[i].title);
            // console.log(res[i].times);
            workout_item = {
                workout_sth_c: res[i].title,
                workout_times: res[i].times,
                choice_d: res[i].day.split(','),
                acc:res[i].acc//使用者名稱
            }
            workout_list.push(workout_item);
        }
    });
}

//更新待辦事項//前端
function updateposeClick(id) {
    $("#calendar_win").show(); //顯示視窗
    $("#cal_win").show(); //顯示視窗
    //
    // console.log(id);
    var api = "http://127.0.0.1:3000/api/updateposeClick"; //除非跨域
    var data = {
        "id": id,
        "click": parseInt($('#see_times' + id).text()) + 1,
    }; //這邊給值//更改click+1
    $('#see_times' + id).text(data.click);
    //---------------------------------------------------------初始化End----------------------------
    //----------------------------------------------------------------//
    jQuery.post(api, data, function(res) { //抓後端資料
        // console.log(res);
        workout_sth_c = res.name;//存取點擊的運動名稱
        console.log("JQ:"+workout_sth_c);
        $("#modal_workout_name p").text(workout_sth_c);/*資料庫*/

        $("td").removeClass("important");//把所有特效清空
        for(var i=0;i<workout_list.length;i++){
            console.log("workout_sth_c陣列:"+workout_list[i].workout_sth_c);
            console.log("workout_sth_c單個:"+workout_sth_c);
            if(workout_sth_c==workout_list[i].workout_sth_c){//有存取過該運動
                console.log("已存取過運動名稱:"+workout_list[i].workout_sth_c);
                same=true;
                sameID=i;
                choice_d=workout_list[i].choice_d;//當前日期陣列的值=資料庫物件裡面日期陣列的值
                console.log(choice_d);
                var Days = document.getElementsByTagName("td");
                for (var k = 0; k <= 41; k++) {
                    for (var j = 0; j < choice_d.length; j++) {
                        if ($(Days[k]).attr("data-uid") == choice_d[j]) {
                            $(Days[k]).addClass("important");
                            break;
                        }
                    }
                }
                // console.log(workout_list[i].choice_d);
                // console.log(choice_d);
                break;
            }
        }
    });
    //----------------------------------------------------------------//
    
    
    //----------------------------------------------------------------//
    //---------------------------------------------------------初始化End----------------------------
    //-------------------------------for迴圈判斷workout_list的物件裡面是否有該運動名稱
    
}
//---------------------------------------------------------abbyEND-------------------------------
$("#calender_close").click(function() {
    console.log(workout_list);
});



let workout_sth = "";
/*--------------------------------folder--------------------------------------*/

$(".folder").click(function () {
    console.log(1);
    // var $father = $(this).parent().parent().parent().parent();
    // workout_sth = $father.find(".card-body h3").text();
    // console.log(workout_sth);
    // $("#folder_win").show();
});

$("#folder_close").click(function() {
    $("#folder_win").hide();
});
//新增資料夾#new_add
$('#new_add').click(function() {
    let $father = $(this).parent(); //找按鈕的父元素
    let new_folder_name = $father.find('#new_name').val(); //尋找子元素輸入欄位的val
    if (new_folder_name != "") {
        console.log(new_folder_name);
        let new_row = `
          <div class="folder_workout">
            <div class="folder_name"><p>${new_folder_name}</p></div>
            <div class="folder_add"><p>+</p></div>
          </div>
        `;
        $('#folder_workout_block').append(new_row);
    }
});
//加入資料夾.folder_add
$('.folder_add').click(function() {
    var $f = $(this).parent(); //找按鈕的父元素
    console.log($f);
    var add_item = $f.find('.folder_name p').text(); //尋找子元素檔案名稱的txt
    console.log(add_item);
    console.log(workout_sth);
});
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
    // console.loglog($('#findtxt').val());
});