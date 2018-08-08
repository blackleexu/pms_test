/**
 * Created by fu.
 * Date: 14-5-14
 * Time: 下午5:07
 */
/**
 *
 * @param html
 * @param status  ok或error
 * @param timeout
 */
(function () {

    var cur_js_path = (function () {
        var js = document.scripts;
        js = js[js.length - 1].src.substring(0, js[js.length - 1].src.lastIndexOf("/"));
        return js;
    })();

    /**
     *
     * @param html
     * @param status
     * @param timeout
     * @param options {"appendEle"}
     * @returns {*|jQuery}
     * @constructor
     */
    window.Tip = function (html, status, timeout, options) {

        var background = 'rgba(47,46,44,0.9)';
        var pl = 0,
                pt = 0,
                eleWidth = 300;
        var default_options = {
            appendEle:null
        };
        options = $.extend(default_options,options);
        var $tip_widget  = $('body').find('.tip_widget');
        if (status == 'error') {
            //background = '#FF7979';
        }

        var img = 'label_success';
        if (status == 'error') {
            img = 'label_lost';
        }
        if (options.appendEle){
            var ele_offset = $(options.appendEle).offset();
            pl = ele_offset.left + ($(options.appendEle).width() - eleWidth) / 2;
            pt = ele_offset.top +  $(options.appendEle).height() / 2;
        }else{
            pl = $(document).scrollLeft() + ($(window).width() - eleWidth) / 2;
            pt = ($(window).height()) / 2;
            pt = $(document).scrollTop() + pt;
        }
        if (!$tip_widget.length) {
            $tip_widget = $('<div class="tip_widget" style="-webkit-transition:all .3s ease-in-out;">' +
                    '<div class="tip_widget_icon" style="vertical-align:middle;display:inline-block;background: url(' + cur_js_path + '/images/' + img + '.png) no-repeat;height: 24px;width: 24px;"></div>' +
                    '<div class="tip_widget_text" style="min-width: 120px;max-width: 226px;margin-left:10px;vertical-align:middle;display: inline-block;"></div></div>')
                    .css({
                        position: 'absolute',
                        padding: '10px 20px',
                        boxShadow: '0 0 2px rgba(0,0,0,.8)',
                        minHeight: 20,
                        fontSize: 16,
                        top: pt,
                        zIndex: 30000, background: background, color: '#fff',opacity:0
                    })
                    .addClass('top_status_' + status);
            $tip_widget.appendTo('body');
        } else {
            $tip_widget.attr('class', 'tip_widget top_status_' + status);
        }

        $tip_widget.css({left: pl,top: pt + 20}).show();
        $tip_widget.css({opacity: 1});

        $tip_widget.find('.tip_widget_icon').css({'background-image':'url('+cur_js_path + '/images/' + img + '.png'+')'});
        $tip_widget.css({background: background}).find('.tip_widget_text').html(html);
        timeout = timeout || 1500;


        if (!status || status.toString().indexOf('notimer') == -1) {

            if (Tip.hide_time > 0) {
                clearTimeout(Tip.hide_time);
                Tip.hide_time = 0;
            }
            if (Tip.hide_time_1 > 0) {
                clearTimeout(Tip.hide_time_1);
            }
            Tip.hide_time_1 = setTimeout(function () {
                $tip_widget.css({top: pt + 30, opacity: 0});
                Tip.hide_time = setTimeout(function () {
                    $tip_widget.hide();
                }, 300);
            }, timeout);
        }
        return $tip_widget;
    };
})();