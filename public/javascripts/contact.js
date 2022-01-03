$(document).ready(function(){
    $("#contactBtn").click(function(){
        var name=$("#yourName").val();
        var email=$("#yourEmail").val();
        var subject=$("#subject").val();
        var mes=$("#yourMes").val();
        var API="http://127.0.0.1:3000/contact";
        var data={
            yourName:name,
            yourEmail:email,
            subject:subject,
            yourMes:mes
        };
        
    });
})