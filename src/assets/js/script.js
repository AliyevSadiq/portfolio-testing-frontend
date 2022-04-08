$(document).ready(function(){
    $(".hamburger").on('click',function(){
        $(".menu").addClass('active');
    });
    $(".menu__close").on('click',function(){
        $(".menu").removeClass('active');
    });

    $('.skills__ratings-line span').each(function (){
        const parent=$(this).parent();
        const percent=$(parent).prev().text();
        $(this).css("width",percent);
    })
});