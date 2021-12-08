    $(".dropdown-item").click(function(){
      var workout_part = $(this).text();
      console.log(1);
    });
    
    /*--------------------------------生成workout_div--------------------------------------*/
    var workout_name="",workout_name2="";
    var diff=0,diff2=0;
    var eq="NO",eq2="NO";
    var jp="NO",jp2="NO";
    var workout_img="",workout_img2="";
    for(var i=0;i<3;i++){
        if(i==0){
            workout_name="Jumping Squat";
            workout_name2="side plank";
            diff=3.5;
            diff2=4;
            jp="Yes";
            workout_img="img_workout/get_fit/full/full_jumping_squat.jpg";
            workout_img2="/img_workout/get_fit/full/full4.jpg";
        }else if(i==1){
            workout_name="Sprinter";
            workout_name2="Leg glute bridge"
            diff=3;
            diff2=4.5;
            eq="NO";
            jp="NO";
            workout_img="img_workout/get_fit/full/full_sprinter_right.jpg";
            workout_img2="/img_workout/get_fit/full/full5.jpg";
        }else{
            workout_name="Squat boxing";
            workout_name2="Triceps push up"
            diff=3.5;
            diff=4;
            eq="Yes";
            jp="NO";
            workout_img="img_workout/get_fit/full/full_jumping_squat.jpg";
            workout_img2="/img_workout/get_fit/full/full6.jpg";
        }
        var row_block = `
        <div class="card border-GreenLake">
            <div class="card-header">
                <ul class="nav nav-tabs card-header-tabs">
                    <li class="nav-item">
                        <a class="nav-link">
                            <img src="img/icon_see_times.png" width="20px">
                            <p class="see_times">10</p>
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link folder">
                            <img src="img/icon_folder.png" width="25px">
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link calender">
                            <img src="img/icon_calender.png" width="20px">
                        </a>
                    </li>
                </ul>
            </div>
            <img class="card-img-top" src="${workout_img}" alt="Card image cap">
            <div class="card-body text-GreenLake">
                <h3 class="card-title">${workout_name}</h3>
                <p class="card-text">
                    Difficulty：${diff}/5 <br>
                    equipment：${eq} <br>
                    Jumping：${jp}
                </p>
            </div>
        </div>
        `
        var row_block2 = `
        <div class="card border-GreenLake">
            <div class="card-header">
                <ul class="nav nav-tabs card-header-tabs">
                    <li class="nav-item">
                        <a class="nav-link">
                            <img src="img/icon_see_times.png" width="20px">
                            <p class="see_times">10</p>
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link folder">
                            <img src="img/icon_folder.png" width="25px">
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link calender">
                            <img src="img/icon_calender.png" width="20px">
                        </a>
                    </li>
                </ul>
            </div>
            <img class="card-img-top" src="${workout_img2}" alt="Card image cap">
            <div class="card-body text-GreenLake">
                <h3 class="card-title">${workout_name2}</h3>
                <p class="card-text">
                    Difficulty：${diff2}/5 <br>
                    equipment：${eq2} <br>
                    Jumping：${jp2}
                </p>
            </div>
        </div>
        `
        $(".card_row1").append(row_block);
        $(".card_row2").append(row_block2);
    }

    let workout_sth="";
    /*--------------------------------folder--------------------------------------*/
    $(".folder").click(function(){
      var $father = $(this).parent().parent().parent().parent();
      workout_sth= $father.find(".card-body h3").text();
      console.log(workout_sth);
      $("#folder_win").show();
    });
    $("#folder_close").click(function(){
      $("#folder_win").hide();
    });
    //新增資料夾#new_add
    $('#new_add').click(function(){
      let $father=$(this).parent();//找按鈕的父元素
      let new_folder_name=$father.find('#new_name').val();//尋找子元素輸入欄位的val
      if(new_folder_name != ""){
        console.log(new_folder_name);
        let new_row=`
          <div class="folder_workout">
            <div class="folder_name"><p>${new_folder_name}</p></div>
            <div class="folder_add"><p>+</p></div>
          </div>
        `;
        $('#folder_workout_block').append(new_row);
      }
    });
    //加入資料夾.folder_add
    $('.folder_add').click(function(){
      var $f=$(this).parent();//找按鈕的父元素
      console.log($f);
      var add_item=$f.find('.folder_name p').text();//尋找子元素檔案名稱的txt
      console.log(add_item);
      console.log(workout_sth);
    });
    /*--------------------------------calender--------------------------------------*/
    $(".calender").click(function(){
      $("#calendar_win").show();
      $("#calendar_win").css({"display":"flex","flex-direction": "column"});
    });