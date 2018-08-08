/**
 * Created by fu.
 * Date: 14-10-16
 * Time: 下午8:44
 */
$.fn.lightboxex = function () {
    var $body = $('body');
    var $doc = $(document);
    var $win = $(window);
    var zIndex = 2000;
    var width = 600;
    var height = 300;
    var page_height =  $doc.scrollTop() + $win.height() / 2;
    var page_width = $win.width() / 2;

    $body.delegate(this.selector, 'click', function () {
        var image = new Image();
        image.src = $(this).attr('href');
        var $lightbox_widget = $body.find('.lightbox_widget');
        var doc_width = $doc.width();
        var doc_height = $doc.height();
        if (!$lightbox_widget.length) {
            $body.append('<div class="lightbox_widget">' +
                 '<div class="ow_lightbox_box" style="display: none;">' +
                    '<div class="ow_lightbox_close close" style="position: absolute;right: 10px;top: 10px;">×</div>' +
                 '<div class="ow_lightbox_cont" style="height: 100%"></div>' +
                '</div>' +
                '<div class="lw_has_shade"></div>' +
                '</div>');
            $lightbox_widget = $body.find('.lightbox_widget');
            var $ow_lightbox_close = $lightbox_widget.find('.ow_lightbox_close');
            var $cancel = $lightbox_widget.find('.cancel');
            $ow_lightbox_close.click(function () {
                lightboxObj.close();
            });
            $cancel.click(function () {
                lightboxObj.close();
            });
        }


        $lightbox_widget.css({
            width: doc_width,
            height: doc_height,
            zIndex: zIndex,
            position: 'absolute',
            left: 0,
            top: 0
        }).show();

        var $lw_has_shade = $lightbox_widget.find('.lw_has_shade').css({
            width: doc_width,
            height: doc_height,
            zIndex: zIndex + 1,
            background: '#000',
            position: 'absolute',
            left: 0,
            top: 0,
            opacity: 0.5
        });
        var pt = page_height - height / 2;
        var pl = page_width - width / 2;
        var $ow_lightbox_box = $lightbox_widget.find('.ow_lightbox_box').css({
            position: 'absolute',
            left: pl,
            top:pt,
            zIndex: zIndex + 2,
            width: width,
            height:height,
            background: '#fff',
            opacity: 0
        });
        var $ow_lightbox_cont = $lightbox_widget.find('.ow_lightbox_cont');

        var lightboxObj = {};
        lightboxObj.close = function () {
            $lightbox_widget.hide();
            return lightboxObj;
        };
        $body.keyup(function (e) {
            if (e.keyCode == 27) {
                lightboxObj.close();
            }
        });
        $ow_lightbox_cont.html('');

        $lw_has_shade.unbind('click').click(function(){
            lightboxObj.close();
        });
        $ow_lightbox_box.css({ top: pt - 150 }).show().animate({top: pt, opacity: 1}, 500, 'easeOutBack');
        image.onload = function(){
            $ow_lightbox_box.animate({
                width:image.width,
                height:image.height,
                left:page_width - image.width / 2,
                top:page_height - image.height /2
            },300,function(){
                var $img = $('<img class="lightbox_img" src="'+image.src+'">');
                $img.hide();
                $ow_lightbox_cont.html($img);
                $img.fadeIn();
            });

        };
        return false;

    });
    var s_start = false;
/*
    $win.bind('resize',function(){
        if(!s_start){
            s_start = true;
        }
        setTimeout(function(){
            var doc_width = $doc.width();
            var doc_height = $doc.height();
            var $lightbox_widget = $body.find('.lightbox_widget');
            var winhalf = ($win.height()) / 2;
            var $ow_lightbox_box = $lightbox_widget.find('.ow_lightbox_box');
            var box_height = $ow_lightbox_box.height() / 2;
*/
/*
            if(box_height > winhalf){
                $ow_lightbox_box.css({
                    height:winhalf*2
                });
                $ow_lightbox_box.find('.lightbox_img').css({
                    height:winhalf*2
                });
            }
*//*

            pt = $doc.scrollTop() - $ow_lightbox_box.height() / 2 + winhalf;

            $ow_lightbox_box.animate({ top: pt  }, 400, 'easeOutBack');
            $lightbox_widget.find('.lw_has_shade').css({
                width: doc_width,
                height: doc_height
            });
        },100);

    });
*/
};