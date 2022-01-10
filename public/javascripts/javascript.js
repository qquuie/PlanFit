$(document).ready(function () {
    console.log("DOM is ready");
    
    $('a#logout').click(function () {
        window.location.href = '/indexG';
    })
    var count = 0;
    var tmp = $('div.row#focusbtn').children().find('label.btn');
    var tmp2 = $('div#sex.btn-group').find('label.btn');
    var tmp3 = $('div#needOptions').find('label.btn')

    tmp.click(function() {
        count = $('div.row#focusbtn').find('.active');
        if (count.length == 1) {
            $('div.infor_data.infor_sex>input').checked == false
        }
        console.log(count.length)
    })
    tmp2.click(function() {
        count = $('div#sex.btn-group').find('.active');
        if (count.length == 1) {
            alert('You only can choose one gender');
            $('div.infor_data.infor_sex>input').checked == false
        }
        console.log(count.length)
    })
    tmp3.click(function() {
            count = $('div#needOptions').find('.active');
            if (count.length == 1) {
                $('div.infor_data.infor_sex>input').checked == false
            }
            console.log(count.length)
        })
        // <--------------------------- Information-------------------------->
    $("div#smallPageModal").css('z-index', '-1'); 
    $("div#workoutModalIDdiv").css('z-index', '-1');
    $("div#changePsModalDiv").css('z-index', '-1'); 

    $(".page").css('z-index', '1000');
    $(".nav.navbar").css('z-index', '1050');
    let folder = [];
    let id = 2;

    $(".dropdown-item").click(function() {
        $('.dropdown-menu').css("display", "none");
    })
    $("#workOutNav").click(function() {
        $("#workOutMenu.dropdown-menu").toggle();

    })
    $("#inforNav").click(function() {
        $("#inforMenu.dropdown-menu").toggle();
    })
    $('.page').click(function() {
        $("#inforMenu.dropdown-menu").hide();
        $("#workOutMenu.dropdown-menu").hide();

    })
    $("div#navbars.navbar-collapse").addClass('hide');

    $("button.navbar-toggler").click(function() {
        $("div#navbars.navbar-collapse").toggleClass("show")
        $("div#navbars.navbar-collapse").toggleClass("hide");
    })

    $("ul#workOutMenu>a.dropdown-item").click(function() {
        $("div#smallPageModal").css('z-index', '-1');

    })
    $('button#closeBtnPs').click(function () {
        $(".modal-backdrop").addClass("fade");
        $("div#changePsModalID").addClass("fade");
        $("div#changePsModalDiv").addClass("fade");
        $("div#changePsModalDiv").css('z-index', '-1');
        $("div#changePsModalID").css('z-index', '-1');
        $(".page").css('z-index', '1050');
        $("div#changePsModalID").modal("toggle");


    })
    $('button#closeBtnPsImg').click(function () {
        $(".modal-backdrop").addClass("fade");
        $("div#changePsModalID").addClass("fade");
        $("div#changePsModalDiv").addClass("fade");
        $("div#changePsModalDiv").css('z-index', '-1');
        $("div#changePsModalID").css('z-index', '-1');
        $(".page").css('z-index', '1050');
        $("div#changePsModalID").modal("toggle");

    })
    $('button#closeBtnWorkout').click(function () {
        $(".modal-backdrop").addClass("fade");
        $("div#workoutModalID").addClass("fade");
        $("div#workoutModalIDdiv").addClass("fade");
        $("div#workoutModalIDdiv").css('z-index', '-1');

        $("div#workoutModalID").css('z-index', '-1');
        $(".page").css('z-index', '1000');
        $("div#workoutModalID").modal("toggle");


    })
    $('button#closeBtnWorkoutImg').click(function () {
        $(".modal-backdrop").addClass("fade");
        $("div#workoutModalID").addClass("fade");
        $("div#workoutModalIDdiv").addClass("fade");
        $("div#workoutModalIDdiv").css('z-index', '-1');

        $("div#workoutModalID").css('z-index', '-1');
        $(".page").css('z-index', '1000');
        $("div#workoutModalID").modal("toggle");

    })
    $('button#closeBtn').click(function() {
        $(".modal-backdrop").addClass("fade");
        $("div#smallPageModal").addClass("fade");
        $("div#smallPageModal").css('z-index', '-1');
        $(".page").css('z-index', '1000');
        $('#signUpName').val('');
        $('#signUpEmail').val('');
        $('#signUpPass').val('');
        $('#signUpBirth').val('');
        $('#yourHeight').val('');
        $('#yourAge').val('');
        $('#yourWeight').val('');
        $('form').find('label.btn.active').removeClass('active');
        $(".inputForm5").show();
        $(".inputForm1").hide();
        $(".inputForm2").hide();
        $(".inputForm4").hide();
        $(".inputForm3").hide();
        $("div.modalContainer").css("background-color", "#bacec1")

    })

    $('button#signInBtn').click(function() {
        $(".modal-backdrop").addClass("fade");
        $("div#smallPageModal").addClass("fade");
        $("div#smallPageModal").css('z-index', '-1');
        $(".page").css('z-index', '1000');
    })

    $('button#signUpBtn').click(function() {
        $(".modal-backdrop").addClass("fade");
        $("div#smallPageModal").addClass("fade");
        $("div#smallPageModal").css('z-index', '-1');
        $(".page").css('z-index', '1000');
    })
    jQuery.noConflict();

    $('#inforSign').click(function() {
        $("div#smallPageModal").toggle();
        $("div#smallPageModal").modal("toggle");
        $("div#smallPageModal").removeClass("fade");
        $(".modal-backdrop").removeClass("fade");
        $("div#smallPageModal").css('z-index', '1050');
        $(".page").css('z-index', '-1');
        console.log(1)
    })

    $(".inputForm2").hide();
    $(".inputForm3").hide();
    $(".inputForm4").hide();
    $('div#inputFormID1.inputForm1').css('display', 'none')

    $("button#joinUs").click(function() {
        console.log(1);
        $(".inputForm1").show();
        $(".inputForm5").hide();
        $("div.modalContainer").css("background-color", "#f3f1de")
    })
    $("button#nextBtn3").click(function() {
        console.log(1);
        $(".inputForm2").show();
        $(".inputForm1").hide();
    })

    $("button#nextBtn").click(function() {
        console.log(1);
        $(".inputForm3").show();
        $(".inputForm1").hide();
        $(".inputForm2").hide();
    })

    $("button#nextBtn2").click(function() {
        console.log(1);
        $(".inputForm4").show();
        $(".inputForm1").hide();
        $(".inputForm2").hide();
        $(".inputForm3").hide();

    })

    $('button#signInBack').click(function() {
        $(".inputForm5").show();
        $(".inputForm1").hide();
        $(".inputForm2").hide();
        $(".inputForm4").hide();
        $(".inputForm3").hide();
        $("div.modalContainer").css("background-color", "#bacec1")

    })
    $("label.btn").click(function() {
            $(this).button('toggle');
        })
        // ---------------------------------folder------------------------------------

    $('#inforFolder').click(function() {
        $("div#smallPageModal_folder").toggle();
        $("div#smallPageModal_folder").modal("toggle");
        $("div#smallPageModal_folder").removeClass("fade");
        $(".modal-backdrop").removeClass("fade");
        $("div#smallPageModal_folder").css('z-index', '1050');
        $(".page").css('z-index', '-1');
    })
    $("div#smallPageModal_folder").css('z-index', '-1'); //abby改
    $(".page").css('z-index', '1000');
    $("ul#workOutMenu>a.dropdown-item").click(function() {
        $("div#smallPageModal_folder").css('z-index', '-1');

    })
    $('button#closeBtnfolder').click(function() {
        $(".modal-backdrop").addClass("fade");
        $("div#smallPageModal_folder").addClass("fade");
        $("div#smallPageModal_folder").css('z-index', '-1');
        $(".page").css('z-index', '1000');
    })


    // ---------------------------------folder------------------------------------
    $('button#closeBtnfolder').click(function () {
        $('#all_fol').empty();
    })
   $('#carousel>img').click(function(){
       console.log($(this).attr('name'))
       
   })

});
