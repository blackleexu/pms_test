/**
 * Created by jesse on 2017/3/10.
 */

// 全屏模式
/**
 * init() 参数
 * full_dom       大屏模式要使用在那个元素上           view_full     大屏模式按钮ID                      cancel_full   退出大屏模式按钮ID
 * map_dom        地图元素                           noWidth       非大屏模式时元素的宽度               noHeight      非大屏模式时元素的高度
 *
 * getIsFullScreen()   获取当前是否为全屏状态  bool
 *
 * getFullDom()        获取全屏显示的dom元素
 *
 * isFullScreen        当前状态   bool
 *
 *
 * document.('fullscreen_out',function(){})  fullscreen_out  退出全屏触发的事件   fullscreen_in  进入全屏触发的事件
 *
 * @type {{getIsFullScreen, getFullDom, isFullScreen, init}}
 */





var full = function(){
    var $win = $(window);
    var initHeight = $win.height();
    var fullDom;
    var mapDom;
    var viewFullScreen ;
    var cancelFullScreen ;
    var isFullScreen = false;
    var noFullHeight = $($win).height()-80;
    var noFullWidth = $($win).width();

    //需要传入id
    function init(full_dom,map_dom,view_full,cancel_full,noWidth,noHeight){
        fullDom = document.getElementById(full_dom);
        mapDom =  document.getElementById(map_dom);

        viewFullScreen = document.getElementById(view_full);
        cancelFullScreen = document.getElementById(cancel_full);
        if(noWidth){
            noFullWidth = noWidth;
        }
        if(noHeight){
            noFullHeight = noHeight;
        }


        initEvent()

    }
    function initEvent(){


        if (viewFullScreen) {
            setInterval(function () {
                if (!isFullScreen) {
                    //非全屏模式下

                }
            }, 200);
            viewFullScreen.addEventListener("click", function () {
                console.log("上大屏");
                launchFullScreen();
            }, false);
        }


        if (cancelFullScreen) {
            cancelFullScreen.addEventListener("click", function () {
                console.log("退出上大屏");
                exitFullScreen();
            }, false);
        }


        document.addEventListener("fullscreenchange", function () {
            isFullScreen = (document.fullscreenElement) ? true : false;
            setWidthAndHeightForExit(isFullScreen);

        }, false);

        document.addEventListener("msfullscreenchange", function () {
            isFullScreen = (document.msFullscreen) ? true : false;
            setWidthAndHeightForExit(isFullScreen);
        }, false);

        document.addEventListener("mozfullscreenchange", function () {
            isFullScreen = (document.mozFullScreen) ? true : false;
            setWidthAndHeightForExit(isFullScreen);
        }, false);

        document.addEventListener("webkitfullscreenchange", function () {
            isFullScreen = (document.webkitIsFullScreen) ? true : false;
//        commandMethod.isFullSet(isJudge_var.isFullScreen);
            setWidthAndHeightForExit(isFullScreen);
        }, false);

    }




    function getIsFullScreen(){
        return isFullScreen;
    }
    function getFullDom(){
        return fullDom;
    }
    function launchFullScreen() {
        if (fullDom) {
            //进入全屏 投影模式
            setWidthAndHeightForExit(true);
            if (fullDom.requestFullscreen) {
                fullDom.requestFullscreen();

            }
            else if (fullDom.msRequestFullscreen) {
                fullDom.msRequestFullscreen();

            }
            else if (fullDom.mozRequestFullScreen) {
                fullDom.mozRequestFullScreen();


            }
            else if (fullDom.webkitRequestFullScreen) {
                fullDom.webkitRequestFullScreen();

            }

        }

    }

    function exitFullScreen() {
        var fullDom = document;
        if (fullDom) {
            setWidthAndHeightForExit(false);
            //退出全屏  投影模式
            if (fullDom.exitFullscreen) {
                fullDom.exitFullscreen();
            }
            else if (fullDom.msExitFullscreen) {
                fullDom.msExitFullscreen();
            }
            else if (fullDom.mozCancelFullScreen) {
                fullDom.mozCancelFullScreen();

            }
            else if (fullDom.webkitCancelFullScreen) {
                fullDom.webkitCancelFullScreen();
            }
        }

    }
    function setWidthAndHeightForExit(fullScreen) {
        isFullScreen = fullScreen;

        if (fullScreen) {
            $(cancelFullScreen).show();
            $(viewFullScreen).hide();
            //$('#common_main').css({'border': '1px solid #4D556A'});


            $(fullDom).width($win.width());
            $(fullDom).height($win.height());

            $(mapDom).width($win.width());
            $(mapDom).height($win.height());
            $(document).trigger('fullscreen_in');


            //$('.work_box').css({'max-height':$win.height()  - 200});
        } else {
            $(cancelFullScreen).hide();
            $(viewFullScreen).show();
            //$('#common_main').css({'border': '8px solid #4D556A'});


            $(fullDom).width(noFullWidth);
            $(fullDom).height(noFullHeight);

            $(mapDom).width(noFullWidth);
            $(mapDom).height(noFullHeight);
            $(document).trigger('fullscreen_out');


        }

    }

    $win.bind('resize', function () {
        setWidthAndHeightForExit(isFullScreen);
        //设置右边高度
        $('.visit_statis_my');
        $('.work_box');
        //container  $win.height()-120-100
    });



    $(document).ready(function () {
    }).keydown(function (e) {
        if (e.which === 27) {
            setWidthAndHeightForExit(false);
            console.log('esc');

        }
    });
    return {
        getIsFullScreen:getIsFullScreen,
        getFullDom:getFullDom,
        isFullScreen:isFullScreen,
        init:init
    }
}();
