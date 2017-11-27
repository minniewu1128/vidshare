$(document).ready(function () {
    $('.main_chat2').toggle();
    $('.user_box').click(function () {
        if ($('.wrap_box2').is(":visible")) {
            $('.wrap_box2').hide();
            $('.main_chat2').addClass('hide_wrap_box');
            $('#icon').html('^');
        }
        else {
            $('.wrap_box2').show();
            $('.main_chat2').removeClass('hide_wrap_box');
            $('#icon').html('x');
        }
    });
});