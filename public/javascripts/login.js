// const { parseChar } = require("character-parser");
getInfor();
// wellcome();
function addUser() {
    var acc = $('#signUpName').val();
    var pw = $('#signUpPass').val();
    var email = $('#signUpEmail').val();
    var birth = $('#signUpBirth').val();
    var height = $('#yourHeight').val();
    var weight = $('#yourWeight').val();
    var age = $('#yourAge').val();
    var sex;
    var focusOption;
    var needOption;

    var checkboxes = document.getElementsByName("sex");
    var checked = [];

    var checkboxes2 = document.getElementsByName("focusOptions");
    var checked2 = [];

    var checkboxes3 = document.getElementsByName("needOptions");
    var checked3 = [];

    for (var i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i].checked) {
            checked.push(checkboxes[i].value)
            console.log(checked);
        }
    }
    sex = checked.toString();

    for (var j = 0; j < checkboxes2.length; j++) {
        if (checkboxes2[j].checked) {
            checked2.push(checkboxes2[j].value)
            console.log(checked2);
        }
    }
    focusOption = checked2.toString();

    for (var i = 0; i < checkboxes3.length; i++) {
        if (checkboxes3[i].checked) {
            checked3.push(checkboxes3[i].value)
            console.log(checked3);
        }

    }
    needOption = checked3.toString();

    console.log(sex);
    console.log(focusOption);
    console.log(needOption);

    if (acc == "" && pw == "") {
        alert("請輸入標題和內容!");
    } else {
        var api = "http://127.0.0.1:3000/api/addUser";
        var data = {
            "acc": acc,
            "pw": pw,
            "email": email,
            "birth": birth,
            'sex': sex,
            'focusOption': focusOption,
            'needOption': needOption,
            'height': height,
            'weight': weight,
            'age': age,
        };
        jQuery.post(api, data, function (res) {
            $('#signUpName').val('');
            $('#signUpPass').val('');
            $('#signUpEmail').val('');
            $('#signUpBirth').val('');
            $('#yourHeight').val('');
            $('#yourWeight').val('');
            $('#yourAge').val('');
            window.location.href = '/index';
            alert(data.acc + data.pw + " 新增成功");


        });
    }
}

function getUser() {
    var id = $('#yourAccount').val();
    var pass = $('#yourPass').val();
    var api = "http://127.0.0.1:3000/api/getUser";
    var user = {
        'acc': id,
        'pw': pass
    };
    if (id == "" && pass == "") {
        alert("請輸入標題和內容!");
    } else {

        jQuery.post(api, {
            'acc': id,
            'pw': pass
        }, function (res) {
            if (res.status == 1) {
                console.log(res.msg);
            } else {
                $.cookie('acc', res.data.acc);
                $.cookie('pw', res.data.pw);
                location.href = 'index';
                alert(1)
            }
        });

    }
};

function welcome() {
    var id = $('#yourAccount').val();
    var pass = $('#yourPass').val();
    var api = "http://127.0.0.1:3000/api/welcome";
    jQuery.get(api, function (data) {
        for (let i = 0; i < data.length; i++) {
            if (data[i].acc === id && data[i].pw === pass) {
                $('#welcome').val(data[i].acc);
            }
        }
    });
}

function getInfor() {
    var api = "http://127.0.0.1:3000/api/getInfor";
    jQuery.get(api, function (data) {
        for (let i = 0; i < data.length; i++) {
            infor(data[i]);
        }
    });
}
var content = "";

function infor(data) {
    content =
        ` <div class="row information">
        <div class="col-sm-3"></div><button class="btn" id="infor_headshot" readonly="true"></button>
        <div class="col-8"></div>
        <div class="row">
            <div class="col">
                <div class="infor_txt"></div>
                <p>Email</p>
                <div class="infor_data"></div>
                <p>'${data.email}'</p>
            </div>
            <div class="col">
                <div class="infor_txt"></div>
                <p>Name</p>
                <div class="infor_data"></div>
                <p>'${data.acc}'</p>
            </div>
            <div class="col">
                <div class="infor_txt"></div>
                <p>Birthday</p>
                <div class="infor_data"></div>
                <p>'${data.birth}'</p>
            </div>
            <div class="col">
                <div class="infor_txt"></div>
                <p>Sex</p>
                <div class="infor_data infor_sex"></div>
                <p>'${data.sex}'</p>
            </div>
            <div class="col">
                <div class="infor_txt"></div>
                <p>Height</p>
                <div class="infor_data"></div>
                <p>'${data.height}'</p>
            </div>
            <div class="col">
                <div class="infor_txt"></div>
                <p>Weight</p>
                <div class="infor_data"></div>
                <p>'${data.weight}'</p>
            </div>
            <div class="col">
                <div class="infor_txt"></div>
                <p>Age</p>
                <div class="infor_data"></div>
                <p>'${data.age}'</p>
            </div>
            <div class="col">
                <div class="row">
                    <div class="infor_txt col col-3"></div>
                    <p>What do you need?</p>
                    <div class="infor_data infor_need col-10"></div>
                    <p>'${data.needOption}'</p>
                </div>
            </div>
            <div class="col">
                <div class="row">
                    <div class="infor_txt col-3"></div>
                    <p>Which parts should you focus on?</p>
                    <div class="infor_data infor_focus col-10"></div>
                    <p>'${data.focusOption}'</p>
                </div>
            </div>
            <div class="infor_OK"><button class="btn">Edit</button></div>
        </div>
        </div>
                    `;
    $('div#infor.container').append(content);
}