$(document).ready(function () {
    // <--------------------------- Information-------------------------->
    $("div#smallPageModal").css('z-index', '-1'); //abby改
    $(".page").css('z-index', '1000');
    $(".nav.navbar").css('z-index', '1050');
    // -------------------folder----------------
    let folder = [];
    let id = 2;
    // -------------------folder----------------

    $(".dropdown-item").click(function () {
        $('.dropdown-menu').css("display", "none");
    })
    $("#workOutNav").click(function () {
        $("#workOutMenu.dropdown-menu").toggle();

    })
    $("#inforNav").click(function () {
        $("#inforMenu.dropdown-menu").toggle();
        console.log(1)
        
    })
    $('.page').click(function () {
        $("#inforMenu.dropdown-menu").hide();
        $("#workOutMenu.dropdown-menu").hide();

    })
    $("div#navbars.navbar-collapse").addClass('hide');

    $("button.navbar-toggler").click(function () {
        $("div#navbars.navbar-collapse").toggleClass("show")
        $("div#navbars.navbar-collapse").toggleClass("hide");
    })

    $("ul#workOutMenu>a.dropdown-item").click(function () {
        $("div#smallPageModal").css('z-index', '-1');

    })
    $('button#closeBtn').click(function () {
        $(".modal-backdrop").addClass("fade");
        $("div#smallPageModal").addClass("fade");
        $("div#smallPageModal").css('z-index', '-1');
        $(".page").css('z-index', '1000');

    })

    $('button#signInBtn').click(function () {
        $(".modal-backdrop").addClass("fade");
        $("div#smallPageModal").addClass("fade");
        $("div#smallPageModal").css('z-index', '-1');
        $(".page").css('z-index', '1000');
    })

    $('button#signUpBtn').click(function () {
        $(".modal-backdrop").addClass("fade");
        $("div#smallPageModal").addClass("fade");
        $("div#smallPageModal").css('z-index', '-1');
        $(".page").css('z-index', '1000');
    })
    jQuery.noConflict();

    $('#inforSign').click(function () {
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

    $("button#joinUs").click(function () {
        console.log(1);
        $(".inputForm1").show();
        $(".inputForm5").hide();
        $("div.modalContainer").css("background-color", "#f3f1de")
    })
    $("button#nextBtn3").click(function () {
        console.log(1);
        $(".inputForm2").show();
        $(".inputForm1").hide();
    })

    $("button#nextBtn").click(function () {
        console.log(1);
        $(".inputForm3").show();
        $(".inputForm1").hide();
        $(".inputForm2").hide();
    })

    $("button#nextBtn2").click(function () {
        console.log(1);
        $(".inputForm4").show();
        $(".inputForm1").hide();
        $(".inputForm2").hide();
        $(".inputForm3").hide();

    })

    $('button#signInBack').click(function () {
        $(".inputForm5").show();
        $(".inputForm1").hide();
        $(".inputForm2").hide();
        $(".inputForm4").hide();
        $("div.modalContainer").css("background-color", "#bacec1")

    })
    $("label.btn").click(function () {
        $(this).button('toggle');
    })
    // ---------------------------------folder------------------------------------

    $('#inforFolder').click(function () {
        $("div#smallPageModal_folder").toggle();
        $("div#smallPageModal_folder").modal("toggle");
        $("div#smallPageModal_folder").removeClass("fade");
        $(".modal-backdrop").removeClass("fade");
        $("div#smallPageModal_folder").css('z-index', '1050');
        $(".page").css('z-index', '-1');
    })
    $("div#smallPageModal_folder").css('z-index', '-1'); //abby改
    $(".page").css('z-index', '1000');
    $("ul#workOutMenu>a.dropdown-item").click(function () {
        $("div#smallPageModal_folder").css('z-index', '-1');

    })
    $('button#closeBtnfolder').click(function () {
        $(".modal-backdrop").addClass("fade");
        $("div#smallPageModal_folder").addClass("fade");
        $("div#smallPageModal_folder").css('z-index', '-1');
        $(".page").css('z-index', '1000');
    })


    $('#add_fol').click(function () {
        addFolder();
    });

    // ---------------------------------folder------------------------------------

    // -----------------新增文件夾------------------
    function addFolder() {
        let title = $('#yourfolder').val();
        if (title == "") {
            alert("Please enter the folder name!");
        } else {
            let newFolderdiv = {
                'id': id,
                'title': title,
                'status': false
            };
            folder.push(newFolderdiv);
            newFolder(newFolderdiv);
            newFolderList(newFolderdiv);
            id++;
            $('#yourfolder').val('');
        }

    }
    let today = new Date(); //新增一個Date物件，命名為today
    let thisYear = today.getFullYear();
    let thisMonth = today.getMonth();
    let thisDate = today.getDate();
    updateDates();
    fillInMonth(thisYear, thisMonth, thisDate);
    // -----------------新增文件夾div------------------
    function newFolder(data) {
        let status = (data.status) ? "checked" : "";
        let content =
            `<div class="d-flex flex-row alr-folder position-relative" id="${data.id}">
            <img src="img/icon_folder.png">
            <p onclick="FolderList('${data.id}')">${data.title}</p>
            <img src="img/close_r.png" class="close" id="del_folder${data.id} onclick="removeFolder('${data.id}')">
        </div>`;
        $('#all_fol').append(content);
    }
    // -----------------新增文件夾動作div------------------
    function newFolderList(data) {
        let content =
            `<div class="modal-body d-none" id="folder${data.id}">
            <div class="input-group-lg mt-3">
                <h1><img src="img/icon_folder.png">${data.title}</h1>
            </div>
            <div id="fol_move${data.id}">
                <div class="d-flex flex-row position-relative alr-folder" id="${data.id}">
                    <p>My favorite</p>
                    <img src="img/close_r.png" class="close" id="del_list${data.id}"  onclick="removeList('${data.id}')">
                </div>
            </div>
            <div class="input-group-lg mb-3 d-flex flex-row position-relative fol-btn">
                <div type="button" class="btn btn-sm back-btn" onclick="backBtn('${data.id}')"><p>Back</p></div>
                <div type="button" class="btn btn-sm d-flex justify-content-between addelse-btn" onclick=""><p>Add else</p> <img src="img/add.png" alt=""></div>
            </div>
        </div>`;
        // $('.Page').append(content);
        $('.folder').append(content);
    }
    // -----------------進入文件夾------------------
    function FolderList(id) {
        $('#folder').addClass("d-none");
        $('#folder' + id).removeClass("d-none");
    }
    // -----------------刪除文件夾------------------
    function removeFolder(id) {
        let index = folder.findIndex(element => element.id == id);
        folder.splice(index, 1);
        $('#' + id).remove();
    }
    // -----------------刪除動作------------------
    function removeList(id) {
        let index = folder.findIndex(element => element.id == id);
        folder.splice(index, 1);
        $('#' + id).remove();
    }
    // -----------------回到所有文件夾------------------
    function backBtn(id) {
        $('#folder').removeClass("d-none");
        $('#folder' + id).addClass("d-none");
    }

});