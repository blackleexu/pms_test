var msgBox = {
    isInit: false,
    isShow: false,
    box_width: 400,
    box_height: 300,
    box_body: '',
    callback: false,
    beforeShow: false,
    showCallback: false,
    btn_ok: t('ok'),
    is_need_btn_ok: true,
    btn_ok_color: '#136EAA',
    btn_close: t('cancel'),
    is_need_box_close: true,
    is_need_btn_close: true,
    is_need_msg_title: true,
    is_need_box_bottom: true,
    btn_close_color: '#A0A0A0',
    msg_title: t('tip'),
    msg_title_color: '#393939',
    is_callback_now: false,
    body_no_padding: false,
    get_url: '',
    default_option: {
        box_width: 400,
        box_height: 300,
        box_body: '',
        callback: false,
        beforeShow: false,
        showCallback: false,
        btn_ok: t('ok'),
        is_need_btn_ok: true,
        btn_ok_color: '#136EAA',
        btn_close: t('cancel'),
        is_need_box_close: true,
        is_need_btn_close: true,
        is_need_msg_title: true,
        is_need_box_bottom: true,
        btn_close_color: '#A0A0A0',
        msg_title: t('tip'),
        msg_title_color: '#393939',
        is_callback_now: false,
        body_no_padding: false,
        btn_change_show: false,
        get_url: '',
        btns: [
            {
                'name': t('cancel'), fn: function () {
            }, 'background-color': '#A0A0A0'
            },
            {
                'name': t('ok'), fn: function () {
            }, 'background-color': '#136EAA'
            }
        ]
    },
    initData: function () {
        var thisObj = this;
        if (msgBox.isInit == false) {
            msgBox.isInit == true;
            var msgBoxhtml = '<div id="msg_layer_mask" style="display: none;"></div>';
            msgBoxhtml += '<div class="msg_box" style="display: none;"><div class="box_title">' + t('tip') + '</div>';
            msgBoxhtml += '<span class="box_close box_btn_close">×</span><div class="box_body"></div>';
            msgBoxhtml += '<div class="box_bottom"><button class="box_btn btn_ok">' + t('ok') + '</button><button style="display: none;" class="box_btn btn_change"></button>';
            msgBoxhtml += '<button class="box_btn btn_close box_btn_close">' + t('cancel') + '</button></div></div>';
            $('body').append(msgBoxhtml);
            $('.msg_box .box_btn_close').bind('click', function () {
                thisObj.hide();
            });
        }
    },
    showPro: function (option) {
        var thisObj = this;
        $.extend(thisObj, thisObj.default_option);
        $.extend(thisObj, option);
        thisObj.isShow = true;
        if (thisObj.get_url != '') {
            $.get(thisObj.get_url, function (html_res) {
                thisObj.box_body = html_res;
                thisObj.boxBodyShow(thisObj);
            });
        } else {
            thisObj.boxBodyShow(thisObj);
        }
    },
    boxBodyShow: function (thisObj) {
        $('.msg_box .box_body').html(thisObj.box_body);
        if (thisObj.body_no_padding) {
            $('.msg_box .box_body').css('padding', '0px');
        } else {
            $('.msg_box .box_body').css('padding', '20px');
        }
        $('.msg_box .box_title').html(thisObj.msg_title);
        $('.msg_box .box_title').css('color', thisObj.msg_title_color);
        //this.box_height = $('.msg_box').height();
        thisObj.center();

        if (thisObj.beforeShow !== false) {
            thisObj.beforeShow(thisObj);
        }

        $('#msg_layer_mask').fadeIn();
        $('.msg_box').fadeIn(function () {
            if (thisObj.showCallback !== false) {
                thisObj.showCallback();
            }
        });
        $('.msg_box .btn_ok').unbind().removeProp('disabled').html(thisObj.btn_ok);
        if (this.btn_change_show) {
            $('.msg_box .btn_change').show();
        } else {
            $('.msg_box .btn_change').hide();
        }
        if (thisObj.is_need_box_close) {
            $('.msg_box .box_close').css('display', 'block');
        } else {
            $('.msg_box .box_close').css('display', 'none');
        }
        if (thisObj.is_need_btn_ok) {
            $('.msg_box .btn_ok').css('background-color', thisObj.btn_ok_color);
            $('.msg_box .btn_ok').css('border-color', thisObj.btn_ok_color);
            $('.msg_box .btn_ok').css('display', 'block');
            $('.msg_box .btn_ok').html(thisObj.btn_ok);
        } else {
            $('.msg_box .btn_ok').css('display', 'none');
        }
        if (thisObj.is_need_box_bottom) {
            $('.msg_box .box_bottom').css('display', 'block');
        } else {
            $('.msg_box .box_bottom').css('display', 'none');
        }
        if (thisObj.is_need_btn_close) {
            $('.msg_box .btn_close').css('background-color', thisObj.btn_close_color);
            $('.msg_box .btn_close').css('border-color', thisObj.btn_close_color);
            $('.msg_box .btn_close').css('display', 'block');
            $('.msg_box .btn_close').html(thisObj.btn_close);
        } else {
            $('.msg_box .btn_close').css('display', 'none');
        }
        if (thisObj.is_need_msg_title) {
            $('.msg_box .box_title').css('display', 'block');
            $('.msg_box').css('border', '1px #929292 solid');
            $('.msg_box').css('box-shadow', '0 0 5px #707070');
        } else {
            $('.msg_box .box_title').css('display', 'none');
            $('.msg_box').css('border', '0');
            $('.msg_box').css('box-shadow', '0');
        }
        $('.msg_box .btn_ok').bind('click', function () {
            if (thisObj.is_callback_now) {
                if (thisObj.callback !== false) {
                    thisObj.callback(thisObj, $(this));
                }
            } else {
                thisObj.hide(function () {
                    if (thisObj.callback !== false) {
                        thisObj.callback(thisObj, $(this));
                    }
                });
            }
        });
    },
    show: function (boxBody) {
        var callback = arguments[1] ? arguments[1] : false;
        var btn_ok = arguments[2] ? arguments[2] : t('ok');
        var btn_close = arguments[3] ? arguments[3] : t('cancel');
        var msg_title = arguments[4] ? arguments[4] : t('tip');
        var box_width = arguments[5] ? arguments[5] : 400;
        var is_callback_now = arguments[6] ? arguments[6] : false;

        this.showPro({
            box_body: boxBody,
            callback: callback,
            btn_ok: btn_ok,
            is_need_btn_close: btn_close,
            msg_title: msg_title,
            box_width: box_width,
            is_callback_now: is_callback_now
        });
    },
    hide: function (callback) {
        var thisObj = this;
        $('#msg_layer_mask').fadeOut();
        $('.msg_box').fadeOut(function () {
            if (callback) {
                callback(thisObj);
            }
            thisObj.isShow = false;
            thisObj.box_body = '';
            $('.msg_box .box_body').html('')
        });
    },
    center: function () {
        var width = $('body').width();
        $('.msg_box').css('width', this.box_width + 'px');
        $('.msg_box .box_body').css('max-height', this.box_height + 'px');
        var pl = $(document).scrollLeft() + ((width) / 2 - this.box_width / 2);
        $('.msg_box').css('left', pl);
        var window_height = $(window).height();
        var pt = $(document).scrollTop() + ((window_height - this.box_height) / 2);
        $('.msg_box').css('top', pt);
    }
};
msgBox.initData();