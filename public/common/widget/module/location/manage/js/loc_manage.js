/**
 * Created by onwer on 2017/3/14.
 */
$(function () {
    function chartOnlinStop() {
        setTimeout(function () {
            $('.online_wave_1').css('-webkit-animation', 'initial');
            $('.online_wave_2').css('-webkit-animation', 'initial');
            $('.online_point_1').css('-webkit-animation', 'initial');
            $('.online_point_2').css('-webkit-animation', 'initial');
            $('.online_point_3').css('-webkit-animation', 'initial');
            $('.online_point_4').css('-webkit-animation', 'initial');
            $('.online_ring').css('-webkit-animation', 'initial');
            $('.online_ring').css('display', 'none');
        }, 3000);

    }

    chartOnlinStop();
});
