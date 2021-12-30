// const { parseChar } = require("character-parser");

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
            'age': age

        };
        $.post(api, data, function (res) {
            alert(data.acc + data.pw + " 新增成功");
            $('#signUpName').val('');
            $('#signUpPass').val('');
            $('#signUpEmail').val('');
            $('#signUpBirth').val('');
            $('#yourHeight').val('');
            $('#yourWeight').val('');
            $('#yourAge').val('');
            window.location.href = '/index';

        });
    }
}

function getUser() {
    var id = $('#yourAccount').val();
    var pass = $('#yourPass').val();
    var api = "http://127.0.0.1:3000/api/getUser";
    jQuery.get(api, function (data) {
        for (let i = 0; i < data.length; i++) {
            if (data[i].acc === id && data[i].pw === pass) {
                    window.location.href = '/index';
            }
        }
    });
}