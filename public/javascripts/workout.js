    $(".dropdown-item").click(function() {
        var workout_part = $(this).text();
    });

    /*--------------------------------生成workout_div--------------------------------------*/
    getposeList();

    function getposeList() {
        var api = "http://127.0.0.1:3000/api/getposeList";
        $.get(api, function(data) {
            for (let i = 0; i < data.length; i++) {
                newList(data[i], i, data.length - 1);
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
                                <img src="img/icon_folder.png" width="25px">
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
                        Difficulty：${data.level}/5 <br>
                        equipment：${e} <br>
                        Jumping：${j}
                    </p>
                </div>
            </div>`
        $('.card_row' + col_num).append(tmp);
    }

    //更新待辦事項//前端
    function updateposeClick(id) {
        // console.log(id);
        var api = "http://127.0.0.1:3000/api/updateposeClick"; //除非跨域
        var data = {
            "id": id,
            "click": parseInt($('#see_times' + id).text()) + 1,
        }; //這邊給值//更改click+1
        $('#see_times' + id).text(data.click);
        console.log(data);
        jQuery.post(api, data, function(res) {
            console.log(res);
        });
    }
    let workout_sth = "";
    /*--------------------------------folder--------------------------------------*/
    $(".folder").click(function() {
        var $father = $(this).parent().parent().parent().parent();
        workout_sth = $father.find(".card-body h3").text();
        console.log(workout_sth);
        $("#folder_win").show();
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
    $(".calender").click(function() {
        $("#calendar_win").show();
        $("#calendar_win").css({ "display": "flex", "flex-direction": "column" });
    });


    $("div#smallPageModal").css('z-index', '-1');
    $(".page").css('z-index', '1000');
    $(".calender").click(function() {
        $("#calendar_win").show();
        $("#calendar_win").css({ "display": "flex", "flex-direction": "column" });
    });


    //------
    $(".calender").click(function() {
        $("#cal_win").show();
        $("#cal_win").css({ "display": "flex", "flex-direction": "column" });
    });


    $("div#smallPageModal").css('z-index', '-1');
    $(".page").css('z-index', '1000');
    $(".calender").click(function() {
        $("#cal_win").show();
        $("#cal_win").css({ "display": "flex", "flex-direction": "column" });
    });