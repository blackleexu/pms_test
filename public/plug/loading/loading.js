/**
 * Created by fu.
 * Date: 2015/10/7
 * Time: 15:12
 */
(function(){
    var end = false;
    var cur_js_path = (function(){
            var js=document.scripts;
            js=js[js.length-1].src.substring(0,js[js.length-1].src.lastIndexOf("/"));
            return js;
        })();
    $.startLoad = function (str,options ) {
        var $win = $(window);
        var $doc = $(document);
        var $body = $('body');
        end = false;
        var default_options = {
            appendEle:null
        };
        options = $.extend(default_options,options);

        setTimeout(function () {
            if (end) {
                return;
            }
            end = false;
            var $load_widget = $body.find('.load_widget');
            if (!$load_widget.length) {
                $body.append('<div class="load_widget">' +
                    '<div class="lw_loading" style="background: url('+cur_js_path+'/images/loading_b.gif) #efefef no-repeat 10px; padding-left: 45px;padding-right:10px;border:1px solid #666;box-shadow: 0 0 10px #666;line-height:40px;height: 40px; border-radius: 5px; ">加载中...</div></div>');
                $load_widget = $body.find('.load_widget');
            }

            var pl, pt;
            if (options.appendEle){
                var ele_offset = $(options.appendEle).offset();
                pl = ele_offset.left + ($(options.appendEle).width() - 120) / 2;
                pt = ele_offset.top +  $(options.appendEle).height() / 2;
            }else{
                pl = ($win.width() - 120) / 2;
                pt = ($win.height()) / 2;
                pt = $doc.scrollTop() - 40 / 2 + pt;
            }


            str = (typeof str != 'undefined') ? str : '请求中...';
            $load_widget.show().find('.lw_loading').css({
                left: pl,
                top: pt,
                position: 'absolute',
                zIndex: 1113
            }).html(str);

        }, 100);

    };

    $.endLoad = function () {
        var $body = $('body');
        end = true;
        var $load_widget = $body.find('.load_widget');
        $load_widget.hide();
    };
})();