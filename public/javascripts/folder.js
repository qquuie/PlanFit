$(document).ready(function() {
    //----------------------infor--------------------------
    $('#folder1').hide();
    $('#action1').hide();

    $('#add_fol').click(function() {
        addFolder();
    });

    $("#inforFolder").click(function() {
        listfile();
        // var $father = $(this).parent().parent().parent().parent();
        // workout_sth = $father.find(".card-body h3").text();
        // console.log(workout_sth);
        // $("#folder_win").show();
    });

    $('button#closeBtnfolder').click(function() {
        $(".modal-backdrop").addClass("fade");
        $("div#smallPageModal_folder").addClass("fade");
        $("div#smallPageModal_folder").css('z-index', '-1');
        $(".page").css('z-index', '1000');
        for (var i = 0; i < total; i++) {
            $('.' + i).remove();
        }
    });

    $('.delete_folder').click(function() {
        // removeFolder()
    });
    //----------------------index--------------------
    $('#indexFolder').click(function() {
        console.log(1);
        if (getCookie('username') == "") {
            alert("Sign in! Please!!");
        } else {
            $("div#smallPageModal_folder_index").toggle();
            $("div#smallPageModal_folder_index").modal("toggle");
            $("div#smallPageModal_folder_index").removeClass("fade");
            $(".modal-backdrop").removeClass("fade");
            $("div#smallPageModal_folder_index").css('z-index', '1050');
            $(".page").css('z-index', '-1');
            listfile_i();
        }
    });
    $("div#smallPageModal_folder_index").css('z-index', '-1'); //abby改
    $(".page").css('z-index', '1000');
    $("ul#workOutMenu>a.dropdown-item").click(function() {
        $("div#smallPageModal_folder_index").css('z-index', '-1');

    });
    $('button#closeBtnfolder_index').click(function() {
        $(".modal-backdrop").addClass("fade");
        $("div#smallPageModal_folder_index").addClass("fade");
        $("div#smallPageModal_folder_index").css('z-index', '-1');
        $(".page").css('z-index', '1000');
        $('#all_fol_i').empty();
    });
    $('#add_fol_i').click(function() {
        addFolder_i();

    });
    //----------------------workout--------------------

    $("div#smallPageModal_folder_workout").css('z-index', '-1'); //abby改
    $(".page").css('z-index', '1000');
    $("ul#workOutMenu>a.dropdown-item").click(function() {
        $("div#smallPageModal_folder_workout").css('z-index', '-1');

    });
    $('button#closeBtnfolder_workout').click(function() {
        $(".modal-backdrop").addClass("fade");
        $("div#smallPageModal_folder_workout").addClass("fade");
        $("div#smallPageModal_folder_workout").css('z-index', '-2');
        $(".page").css('z-index', '1000');

        $(".modal-backdrop").addClass("fade");
        $(".modal-backdrop").addClass("show");
        $('#all_fol_w').empty();
    });
    $('#add_fol_w').click(function() {
        addFolder_w();
    });

});

var total = 0;
var f = [];

function listfile() {
    var api = "http://127.0.0.1:3000/api/listfile";
    var acc = {
        acc: getCookie('username'),
    }
    jQuery.post(api, acc, function(data) {
        for (var i = 0; i < data.length; i++) {
            f[i] = data[i].title;
        }
        compareFloder(f);
    });
}

let folder = [];

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


function compareFloder(file) {
    var totalfile = "";
    var filteredArray = file.filter(function(ele, pos) {
        return file.indexOf(ele) == pos;
    });
    for (var i = 0; i < filteredArray.length; i++) {
        newFolder(filteredArray[i], i);
    }

}
let retitle = 0;

// -----------------新增文件夾------------------
function addFolder() {
    let title = $('#yourfolder').val();
    if (title == "") {
        alert("Please enter the folder name!");
    } else {
        retitle = 0;
        for (var i = 0; i < f.length; i++) {
            if (title == f[i]) {
                retitle++;
                break;
            }
        }
        if (retitle == 0) {
            var api = "http://127.0.0.1:3000/api/addFolder";
            let data = {
                'title': title,
                'acc': getCookie('username')
            };
            total++;
            jQuery.post(api, data, function(res) {
                $('#yourfolder').val('');
                f.push(title);
                newFolder(title, total);
            });
        } else {
            $('#yourfolder').val('');
            alert("Duplicate folder name! Please re-enter!");

        }
    }
}
// -----------------刪除文件夾------------------
function removeFolder(data) {
    $('#delet' + data).remove();
    var api = "http://127.0.0.1:3000/api/removeFolder";
    let acc = {
        'acc': getCookie('username'),
        'title': data
    };
    jQuery.post(api, acc, function(res) {

    });
}

// -----------------進入文件夾------------------
var p = [];

function FolderList(data) {
    $('#folder').hide();
    $('#folder1').show();

    newFolderList(data);
    // -----------------呈現動作------------------
    let folder1 = data;
    var api1 = "http://127.0.0.1:3000/api/listpose";
    var acc1 = {
        acc: getCookie('username'),
        folder: folder1
    }
    jQuery.post(api1, acc1, function(data1) {
        for (var i = 0; i < data1.length; i++) {
            p[i] = data1[i].pose;
            newpose(data1[i]);
        }

    });

}
// -----------------文件中的動作div------------------
function newFolderList(data) {
    let content =
        `<div style="padding-top: 20px;">
        <img class="d-inline" style="margin-bottom: 20px;" src="img/icon_folder.png" />
        <p class="d-inline" id="fol_name">${data}</p>
    </div>`;
    $('#fol_title').append(content);
}
// -----------------刪除動作------------------
function removeList(data) {
    $('#pose' + data).remove();
    var api = "http://127.0.0.1:3000/api/removeList";
    let acc = {
        'acc': getCookie('username'),
        'id': data
    };
    jQuery.post(api, acc, function(res) {

    });
}
// -----------------回到所有文件夾------------------
function backBtn(data) {
    $('#folder').show();
    $('#folder1').hide();
    $('#fol_title').empty();
    $('#fol_move').empty();
}
// -----------------進入新增動作介面------------------
function addBtn() {
    $('#action1').show();
    $('#folder1').hide();
}
// -----------------呈現動作------------------
// function listpose() {
//     let folder1 = document.getElementById("fol_name").innerText;
//     var api = "http://127.0.0.1:3000/api/listpose";
//     var acc = {
//         acc: getCookie('username'),
//         folder: folder1
//     }
//     jQuery.post(api, acc, function(data) {
//         for (var i = 0; i < data.length; i++) {
//             newpose(data);
//         }
//     });
// }
// -----------------新增動作div------------------
function newpose(data) {
    let content =
        `<div class="d-flex flex-row position-relative alr-folder" id="pose${data._id}">
            <p>${data.pose}</p>
            <img class="close" id="del_list1" src="img/close_r.png" onclick="removeList('${data._id}')" />
    </div>`;
    $('#fol_move').append(content);
}
// -----------------新增動作------------------
let repose = 0;

function addPose() {
    let folder1 = document.getElementById("fol_name").innerText;
    let pose = $('#addinput').val();
    if (pose == "") {
        alert("Please enter the pose!");
    } else {
        repose = 0;

        for (var i = 0; i < p.length; i++) {
            if (pose == p[i]) {
                repose++;
                break;
            }
        }
        if (repose == 0) {
            var api = "http://127.0.0.1:3000/api/addPose";
            let posedata = {
                'folder': folder1,
                'pose': pose,
                'status': false,
                'acc': getCookie('username')
            };
            jQuery.post(api, posedata, function(res) {
                if (res.status == 0) {
                    $('#addinput').val('');

                } else if (res.status == 1) {
                    alert(res.msg);
                }
                f.push(res.title);
                p.push(res.pose);
                newpose(res);
                backBtn_act();
            });
        } else {
            $('#addinput').val('');
            alert("Duplicate pose name! Please re-enter!");
        }


    }
}
// -----------------回到上一個文件夾------------------
function backBtn_act() {
    $('#folder1').show();
    $('#action1').hide();
}

// -----------------新增文件夾div------------------
function newFolder(data, i) {
    // let status = (data.status) ? "checked" : "";
    let content =
        `<div class="d-flex flex-row alr-folder position-relative ${i}" id="delet${data}">
            <img src="img/icon_folder.png">
            <p onclick="FolderList('${data}')">${data}</p>
            <img src="img/close_r.png" class="close delete_folder" id="del_folder${data}" onclick="removeFolder('${data}')">
        </div>`;
    $('#all_fol').append(content);
}
//----------------------------index------------------------
function listfile_i() {
    var api = "http://127.0.0.1:3000/api/listfile";
    var acc = {
        acc: getCookie('username'),
    }
    jQuery.post(api, acc, function(data) {
        for (var i = 0; i < data.length; i++) {
            f[i] = data[i].title;
            p[i] = data[i].pose;
        }
        compareFloder_i(f);
    });
}

function compareFloder_i(file) {
    var filteredArray = file.filter(function(ele, pos) {
        return file.indexOf(ele) == pos;
    });
    var pose = document.getElementById("pose_name").innerText;
    // for (var j = 0; j < p.length; j++) {

    // }
    for (var i = 0; i < filteredArray.length; i++) {
        newFolder_i(filteredArray[i]);
    }
}

function newFolder_i(data) {
    // let status = (data.status) ? "checked" : "";
    let content =
        `<div class="d-flex flex-row alr-folder position-relative" id="pose_${data}">
            <img src="img/icon_folder.png">
            <p>${data}</p>
            <div class="position-absolute add_ptof" onclick="posetofolder('${data}')">
            <img src="img/add.png">
            </div>
        </div>`;
    $('#all_fol_i').append(content);
}
//首頁.pose增加到folder
function posetofolder(data) {
    let folder1 = data;
    let pose = document.getElementById("pose_name").innerText;
    repose = 0;
    for (var i = 0; i < p.length; i++) {
        if (pose == p[i]) {
            if (folder1 == f[i]) {
                repose++;
                break;
            }
        }
    }
    if (repose == 0) {
        var api = "http://127.0.0.1:3000/api/addPose";
        let posedata = {
            'folder': folder1,
            'pose': pose,
            'status': false,
            'acc': getCookie('username')
        };
        jQuery.post(api, posedata, function(res) {
            // console.log(res.title);
            $("#pose_" + res.title).remove();
        });
    } else {
        alert("Added to this folder!");
    }
}

function addFolder_i() {
    let title = $('#yourfolder_i').val();
    if (title == "") {
        alert("Please enter the folder name!");
    } else {
        retitle = 0;
        for (var i = 0; i < f.length; i++) {
            if (title == f[i]) {
                retitle++;
                break;
            }
        }
        if (retitle == 0) {
            var api = "http://127.0.0.1:3000/api/addFolder";
            let data = {
                'title': title,
                'acc': getCookie('username')
            };
            jQuery.post(api, data, function(res) {
                $('#yourfolder_i').val('');
                f.push(title);
                console.log(f);
                newFolder_i(title);
            });
        } else {
            $('#yourfolder_i').val('');
            alert("Duplicate folder name! Please re-enter!");

        }
    }
}
//----------------------------workout------------------------
function workoutFolder(data) {
    if (getCookie('username') == null) {
        alert("Sign in! Please!!");
    }
    $("div#smallPageModal_folder_workout").toggle();
    $("div#smallPageModal_folder_workout").modal("toggle");
    $("div#smallPageModal_folder_workout").removeClass("fade");
    $(".modal-backdrop").removeClass("fade");
    $(".modal-backdrop").removeClass("show");
    $(".modal-backdrop").hide();
    $("div#smallPageModal_folder_workout").css('z-index', '1050');
    listfile_w(data);
    window.localStorage.setItem('newpose', data);
}

function listfile_w() {
    var api = "http://127.0.0.1:3000/api/listfile";
    var acc = {
        acc: getCookie('username'),
    }
    jQuery.post(api, acc, function(data) {
        for (var i = 0; i < data.length; i++) {
            f[i] = data[i].title;
            p[i] = data[i].pose;
        }
        compareFloder_w(f);
    });
}

function compareFloder_w(file) {
    var filteredArray = file.filter(function(ele, pos) {
        return file.indexOf(ele) == pos;
    });
    for (var i = 0; i < filteredArray.length; i++) {
        newFolder_w(filteredArray[i]);
    }
}

function newFolder_w(data) {
    // let status = (data.status) ? "checked" : "";
    let content =
        `<div class="d-flex flex-row alr-folder position-relative" id="pose_${data}">
            <img src="img/icon_folder.png">
            <p>${data}</p>
            <div class="position-absolute add_ptof" onclick="posetofolder_w('${data}')">
            <img src="img/add.png">
            </div>
        </div>`;
    $('#all_fol_w').append(content);

}
//首頁.pose增加到folder
function posetofolder_w(data) {
    let folder1 = data;
    let pose = window.localStorage.getItem('newpose');
    repose = 0;
    for (var i = 0; i < p.length; i++) {
        if (pose == p[i]) {
            if (folder1 == f[i]) {
                repose++;
                break;
            }
        }
    }
    if (repose == 0) {
        var api = "http://127.0.0.1:3000/api/addPose";
        let posedata = {
            'folder': folder1,
            'pose': pose,
            'status': false,
            'acc': getCookie('username')
        };
        jQuery.post(api, posedata, function(res) {
            // console.log(res.title);
            $("#pose_" + res.title).remove();
        });
    } else {
        alert("Added to this folder!");
    }
}

function addFolder_w() {
    let title = $('#yourfolder_w').val();
    if (title == "") {
        alert("Please enter the folder name!");
    } else {
        retitle = 0;
        for (var i = 0; i < f.length; i++) {
            if (title == f[i]) {
                retitle++;
                break;
            }
        }
        if (retitle == 0) {
            var api = "http://127.0.0.1:3000/api/addFolder";
            let data = {
                'title': title,
                'acc': getCookie('username')
            };
            jQuery.post(api, data, function(res) {
                $('#yourfolder_w').val('');
                f.push(title);
                newFolder_w(title, window.localStorage.getItem('newpose'));
            });
        } else {
            $('#yourfolder_w').val('');
            alert("Duplicate folder name! Please re-enter!");

        }
    }
}