$(document).ready(function(){
    $(".hamburger").on('click',function(){
        $(".menu").addClass('active');
    });
    $(".menu__close").on('click',function(){
        $(".menu").removeClass('active');
    });
});