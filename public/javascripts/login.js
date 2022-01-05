getInfor();

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
            if (res.status == 0) {
                $('#signUpName').val('');
                $('#signUpPass').val('');
                $('#signUpEmail').val('');
                $('#signUpBirth').val('');
                $('#yourHeight').val('');
                $('#yourWeight').val('');
                $('#yourAge').val('');

                setCookie('username', res.data.acc)
                setCookie('password', res.data.pw)
                setCookie('email', res.data.email)
                setCookie('sex', res.data.sex)
                setCookie('focusOption', res.data.focusOption)
                setCookie('needOption', res.data.needOption)
                setCookie('age', res.data.age)
                setCookie('birth', res.data.birth)
                setCookie('height', res.data.height)
                setCookie('weight', res.data.weight)

                window.location.href = 'index';
                alert('Sign up successful')

                // alert(data.acc + data.pw + " 新增成功");

            } else if (res.status == 1) {
                alert(res.msg)
            }
        });
    }
}

function getUser() {
    var id = $('#yourAccount').val();
    var pass = $('#yourPass').val();
    var api = "http://127.0.0.1:3000/api/getUser";
 
    if (id == "" && pass == "") {
        alert("請輸入標題和內容!");
    } else {
        jQuery.post(api, {
            'acc': id,
            'pw': pass
        }, function (res) {
            if (res.status == 1) {
                console.log(res.msg);
                alert('Log in fail')

            } else {
                setCookie('username', res.data.acc)
                setCookie('password', res.data.pw)
                setCookie('email', res.data.email)
                setCookie('sex', res.data.sex)
                setCookie('focusOption', res.data.focusOption)
                setCookie('needOption', res.data.needOption)
                setCookie('age', res.data.age)
                setCookie('birth', res.data.birth)
                setCookie('height', res.data.height)
                setCookie('weight', res.data.weight)

                window.location.href = 'index';
                alert('Log in successful')
            }
        });

    }
};

function logout() {
    deleteCookie('username')
    deleteCookie('email')
    deleteCookie('sex')
    deleteCookie('age')
    deleteCookie('birth')
    deleteCookie('height')
    deleteCookie('weight')
    deleteCookie('needOption')
    deleteCookie('focusOption')
    deleteCookie('password')

    history.go(0);
}
var i;
var sex;
var focusCheck;
var need;

function getInfor() {
    var acc = getCookie('username');
    var email = getCookie('email');
    var sex = getCookie('sex');
    var email = getCookie('email');
    var birth = getCookie('birth');
    var focusOption = getCookie('focusOption');
    var needOption = getCookie('needOption');
    var birth = getCookie('birth');
    var height = getCookie('height');
    var weight = getCookie('weight');
    var age = getCookie('age');

    var data = {
        "acc": acc,
        "email": email,
        "birth": birth,
        'sex': sex,
        'focusOption': focusOption,
        'needOption': needOption,
        'height': height,
        'weight': weight,
        'age': age,
    };
    var api = "http://127.0.0.1:3000/api/getInfor";
    jQuery.post(api, data, function (res) {
        // alert(data);
        console.log(data)
        // edit(data)
        infor(data)
    });

}
var content = "";

function infor(data) {
    $('div#edit.row').addClass('d-none');
    content =
        ` <div class="row information">      

            <div class="col">
                <div class="infor_txt"><p>Email: </p></div>
                
                <div class="infor_data"><p class='_email'>${data.email}</p>
                </div>
            </div>
            <div class="col">
                <div class="infor_txt"><p>Name: </p></div>
                
                <div class="infor_data"><p>${data.acc}</p></div>
                
            </div>
            <div class="col">
                <div class="infor_txt"><p>Birthday: </p></div>
                
                <div class="infor_data"><p>${data.birth}</p>
                </div>
            </div>
            <div class="col">
                <div class="infor_txt"><p>Sex: </p></div>
                
                <div class="infor_data infor_sex"><p id='sexData'>${data.sex}</p>
                </div>
            </div>
            <div class="col">
                <div class="infor_txt"><p>Height: </p></div>
                
                <div class="infor_data"><p>${data.height}</p>
                </div>
            </div>
            <div class="col">
                <div class="infor_txt"><p>Weight: </p></div>
                
                <div class="infor_data"><p>${data.weight}</p></div>
                
            </div>
            <div class="col">
                <div class="infor_txt"><p>Age: </p></div>
                
                <div class="infor_data"><p>${data.age}</p></div>
                
            </div>
            <div class="col">
                    <div class="infor_txt col col-3"><p>Do you need to: </p></div>
                    
                    <div class="infor_data"><p id='#needData'>${data.needOption}</p>
                    </div>
                </div>
            
            <div class="col">
                    <div class="infor_txt col-3"><p>You want to focus on:</p></div>
                    
                    <div class="infor_data"><p id='focusData'>${data.focusOption}</p></div>
                    
            
            </div>
            <div class="infor_OK"><button class="btn" onclick='edit()'>Edit</button></div>
        </div></div>
        </div>
                    `;
    $('div#infor.container').append(content);
}

function edit() {
    $('div#edit.row').removeClass('d-none');
    $('.row.information').addClass('d-none');

    // focusCheck=getCookie('focusOption')
    // need=getCookie('needOption')

    // deleteCookie('email')
    // deleteCookie('sex')
    // deleteCookie('age')
    // deleteCookie('birth')
    // deleteCookie('height')
    // deleteCookie('weight')
    // deleteCookie('needOption')
    // deleteCookie('focusOption')
    // deleteCookie('password')

    // console.log(sex)    ;
    var ctn = `<div class="row" id="edit">
            <div class="col">
                <div class="infor_txt">
                    <p>Email</p>
                </div>
                <div class="infor_data"><input type="email" id="emailChange" /></div>
            </div>
            <div class="col">
                <div class="infor_txt">
                    <p>Account Name</p>
                </div>
                <div class="infor_data"><input type="text" id="account" readonly="true"/></div>
            </div>
            <div class="col">
                <div class="infor_txt">
                    <p>Password</p>
                </div>
                <div class="infor_data"><input type="text" id="pwChange" /></div>
            </div>
            <div class="col">
                <div class="infor_txt">
                    <p>Birthday</p>
                </div>
                <div class="infor_data"><input type="date" id="birthChange" /></div>
            </div>
            <div class="col">
                <div class="infor_txt">
                    <p>Sex</p>
                </div>
                <div class="infor_data infor_sex" >
                <input class="sexChange btn-check mx-1" type="checkbox" name="sexChange" id="F" autocomplete='off' value="Female" />
                <label class="btn" for="F">Female</label>
                <input class="sexChange btn-check mx-1" type="checkbox" name="sexChange" id="M" autocomplete='off' value="Male" />
                <label class="btn" for="M">Male</label></div>
            </div>
            <div class="col">
                <div class="infor_txt">
                    <p>Height</p>
                </div>
                <div class="infor_data"><input type="number" id="heightChange" /></div>
            </div>
            <div class="col">
                <div class="infor_txt">
                    <p>Weight</p>
                </div>
                <div class="infor_data"><input type="number" id="weightChange" /></div>
            </div>
            <div class="col">
                <div class="infor_txt">
                    <p>Age</p>
                </div>
                <div class="infor_data"><input type="number" id="ageChange" /></div>
            </div>
            <div class="col">
                <div class="row">
                    <div class="infor_txt col col-3">
                        <p>What do you need?</p>
                    </div>
                    <div class="infor_data infor_need col-10" >
                    <input class="needChange btn-check mx-1" type="checkbox" name="needChange" id="loseW" autocomplete='off' value="Lose weight" />
                    <label class="btn" for="loseW">Lose Weight</label>
                    <input class="needChange btn-check mx-1" type="checkbox" name="needChange"  id="gainM" autocomplete='off' value="Gain muscle" />
                    <label class="btn" for="gainM" >Gain Muscle</label>
                    <input class="needChange btn-check mx-1" type="checkbox" name="needChange"  id="getF" autocomplete='off' value="Get fitter" />
                    <label class="btn" for="getF" >Get Fitter</label>
                    </div>
                </div>
            </div>
            <div class="col">
                <div class="row">
                    <div class="infor_txt col-3">
                        <p>Which parts should you focus on?</p>
                    </div>
                    <div class="infor_data infor_focus col-10" >
                    <input class="focusChange btn-check  mx-1 mt-1" name="focusChange" type="checkbox" id="butt" autocomplete='off' value="Butt" />
                    <label class="btn" for="butt">Butt</label>
                    <input class="focusChange btn-check  mx-1 mt-1" type="checkbox" name="focusChange" id="full" autocomplete='off' value="Full Body" />
                    <label class="btn" for="full">Full body</label>
                    <input class="focusChange btn-check mx-1 mt-1" type="checkbox" name="focusChange" id="arm" autocomplete='off' value="Arms" />
                    <label class="btn" for="arm">Arms</label>
                    <input class="focusChange btn-check mx-1 mt-1" name="focusChange" type="checkbox" id="back" autocomplete='off' value="Back" />
                    <label class="btn" for="back">Back </label>
                    <input class="focusChange btn-check mx-1 mt-1" type="checkbox" name="focusChange" id="shoulder" autocomplete='off' value="Shoulders" />
                    <label class="btn" for="shoulder">Shoulders </label>
                    <input class="focusChange btn-check mx-1 mt-1" type="checkbox" name="focusChange" id="chest" autocomplete='off' value="Chest" />
                    <label class="btn" for="chest">Chest </label>
                    <input class="focusChange btn-check mx-1 mt-1" type="checkbox" name="focusChange" id="thight" autocomplete='off' value="Thight" />
                    <label class="btn" for="thight">Thight </label>
                    <input class="focusChange btn-check mx-1 mt-1" type="checkbox" name="focusChange" id="abs" autocomplete='off' value="Abs" />
                    <label class="btn" for="abs">Abs </label></div>
                </div>
            </div>
            <div class="infor_OK" id='save'><button class="btn" onclick="changeInfor()">Save</button></div>
        </div>
    </div>
</div>`
    $('div#infor.container').append(ctn);
    $('input#account').val(getCookie('username'))
    $('input#ageChange').val(getCookie('age'))
    $('input#weightChange').val(getCookie('weight'))
    $('input#heightChange').val(getCookie('height'))
    $('input#birthChange').val(getCookie('birth'))
    $('input#pwChange').val(getCookie('password'))
    $('input#emailChange').val(getCookie('email'))

    var count = 0;
    $('div.infor_data.infor_sex>label.btn').click(function () {
        $(this).toggleClass('active')
        count = $('div.infor_data.infor_sex').find('.active')
        if (count.length > 1) {
            alert('You only can choose one gender');
            $('div.infor_data.infor_sex>input').checked == false

            console.log($(this))
        }
        console.log(count.length)

    })
    $('div.infor_data.infor_focus>label.btn').click(function () {
        $(this).toggleClass('active')
        count = $('div.infor_data.infor_focus').find('.active')
        $('div.infor_data.infor_focus>input').checked == false

        console.log(count.length)

    })
    $('div.infor_data.infor_need>label.btn').click(function () {
        $(this).toggleClass('active')
        count = $('div.infor_data.infor_need').find('.active')
        $('div.infor_data.infor_need>input').checked == false

        console.log(count.length)
    })


}

function changeInfor() {
    var acc = getCookie('username');
    var pw;
    if ($('#pwChange').val() === null) {
        pw = getCookie('password');
    } else {
        pw = $('#pwChange').val();

    }
    var email;
    if ($('#emailChange').val() == null) {
        email = getCookie('email');
    } else {
        email = $('#emailChange').val();

    }
    var birth;
    if ($('#birthChange').val() === null) {
        birth = getCookie('birth');
    } else {
        birth = $('#birthChange').val();

    }
    var height;
    if ($('#heightChange').val() === null) {
        height = getCookie('height');
    } else {
        height = $('#heightChange').val();

    }
    var weight;
    if ($('#weightChange').val() === null) {
        weight = getCookie('weight');
    } else {
        weight = $('#weightChange').val();
    }
    var age;
    if ($('#ageChange').val() === null) {
        age = getCookie('age');
    } else {
        age = $('#ageChange').val();
    }
    console.log(age, height, weight, pw)
    var sex;
    var focusOption;
    var needOption;
    var checkboxChange1;
    var checkstr1 = [];
    var checkboxChange2;
    var checkstr2 = [];
    var checkboxChange3;
    var checkstr3 = [];

    checkboxChange1 = document.getElementsByName("sexChange");
    for (var i = 0; i < checkboxChange1.length; i++) {
        if (checkboxChange1[i].checked) {
            checkstr1 += checkboxChange1[i].value;
        }


    }
    console.log(checkstr1);
    sex = checkstr1.toString();

    checkboxChange2 = document.getElementsByName("focusChange");
    for (var j = 0; j < checkboxChange2.length; j++) {

        if (checkboxChange2[j].checked) {
            checkstr2.push(checkboxChange2[j].value);

        }

    }

    console.log(checkstr2);
    focusOption = checkstr2.toString();

    checkboxChange3 = document.getElementsByName("needChange");
    for (var i = 0; i < checkboxChange3.length; i++) {

        if (checkboxChange3[i].checked) {
            checkstr3.push(checkboxChange3[i].value)

        }

    }
    console.log(checkstr3);
    needOption = checkstr3.toString();

    var data = {
        'acc': acc,
        "newemail": email,
        'newpw': pw,
        "newbirth": birth,
        'newsex': sex,
        'newfocusOption': focusOption,
        'newneedOption': needOption,
        'newheight': height,
        'newweight': weight,
        'newage': age,
    };
    var api = "http://127.0.0.1:3000/api/changeInfor";
    if (focusOption.length === 0 && needOption.length === 0 && sex.length === 0) {
        alert('Please check all the check button ')
    } else {
        jQuery.post(api, data, function (res) {
            setCookie('username', res.data.acc)
            setCookie('password', res.data.pw)
            setCookie('email', res.data.email)
            setCookie('sex', res.data.sex)
            setCookie('focusOption', res.data.focusOption)
            setCookie('needOption', res.data.needOption)
            setCookie('age', res.data.age)
            setCookie('birth', res.data.birth)
            setCookie('height', res.data.height)
            setCookie('weight', res.data.weight)
            window.location.href = 'infor';
            alert('Already save')
        });
    }
}

function setCookie(cname, cvalue) {
    const d = new Date();
    d.setTime(d.getTime());
    // let expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + ";path=/";
}

function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function checkCookie() {
    let username = getCookie("username");
    if (username != "") {
        alert("Welcome again " + username);
    } else {
        username = prompt("Please enter your name:", "");
        if (username != "" && username != null) {
            setCookie("username", username, 365);
        }
    }
}

function deleteCookie(name) {
    setCookie(name, "", null, null, null, 1);
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