function addUser() {
    var acc = $('#signUpName').val();
    var pw = $('#signUpPass').val();
    if (acc == "" || pw == "") {
        alert("請輸入標題和內容!");
    } else {
        var api = "http://127.0.0.1:3000/api/addUser";
        var data = {
            "acc": acc,
            "pw": pw
        };
        $.post(api, data, function (res) {
            alert(data.acc+data.pw + " 新增成功")
        });
    }
}

function getUser() {
    var acc = $('#yourAccount').val();
    var pw = $('#yourPass').val();
    var api = "http://127.0.0.1:3000/api/getUser";
    $.get(api,function(data)
    {
        for(let i=0;i<data.length;i++)
        {
            if(data[i].acc == acc)
            {
                if(data[i].pw==pw) 
                    console.log( data[i].acc);
            }
            else{
                alert('fail'+acc);
            }
        }
    });
}   