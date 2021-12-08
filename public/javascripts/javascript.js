$(document).ready(function() {
    $(".navBars").load("navBars.html");
    $("#workOutNav").click(function() {
        $(".dropdown-menu").toggle();
    });
    $("#inforNav").click(function() {
        $(".dropdown-menu").toggle();
    });
    $('.page').click(function() {
        $("#inforMenu.dropdown-menu").hide();
        $("#workOutMenu.dropdown-menu").hide();
    });
});