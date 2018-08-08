/**
 * Created by onwer on 2016/12/22.
 */

var cUtil = {
    getCurJsPath: function () {
        var js = document.scripts;
        js = js[js.length - 1].src.substring(0, js[js.length - 1].src.lastIndexOf("/"));
        return js;
    }
};
var cArr = {
    inArray: function (val, array) {
        for (var i in array) {
            if (array[i] == val) {
                return true;
            }
        }
        return false;
    }
};
var cCookie = {
    get: function (name) {
        var cookieValue = null;
        if (document.cookie && document.cookie != '') {
            var cookies = document.cookie.split(';');
            for (var i = 0; i < cookies.length; i++) {
                var cookie = jQuery.trim(cookies[i]);
                // Does this cookie string begin with the name we want?
                if (cookie.substring(0, name.length + 1) == (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    },
    set: function (name, value, expires, path, domain, secure) {
        if (value === null) {
            value = '';
            expires = -1;
        }
        if (expires && (typeof expires == 'number' || expires.toUTCString)) {
            var date;
            if (typeof expires == 'number') {
                date = new Date();
                date.setTime(date.getTime() + (expires * 24 * 3660 * 1000));
            } else {
                date = expires;
            }
            expires = '; expires=' + date.toUTCString(); // use expires attribute, max-age is not supported by IE
        }
        path = path ? '; path=' + path : '';
        domain = domain ? '; domain=' + domain : '';
        secure = secure ? '; secure' : '';
        document.cookie = [name, '=', encodeURIComponent(value), expires, path, domain, secure].join('');
    }
};
function copy_init() {
    if (window.ZeroClipboard) {
        ZeroClipboard.config({swfPath: baseUrl + '/public/plug/zclip/js/ZeroClipboard.swf'});
        var client = new ZeroClipboard($(".copy_btn"));
        client.on('ready', function (event) {
            client.on("copy", function (event) {
                var clipboard = event.clipboardData;
                clipboard.setData("text/plain", $(event.target).data('copy_data'));
                return false;
            });
            client.on("aftercopy", function (event) {
                Tip(t('tips_success_copy'));
            });

        });
    }
}
/**
 *
 * @param url
 * @param post_data
 * @param fn
 * @param datatype
 * @param hide_loading
 * @param err_fn
 * @param options  {"start_load_tip"}
 */
function ajax_request(url, post_data, fn, datatype, hide_loading, err_fn,options) {
    if (!datatype) {
        datatype = 'json';
    }
    if (!hide_loading) {
        var tip;
        if (options){
            tip = options.start_load_tip;
        }
        $.startLoad(tip);
    }
    $.ajax({
        url: url,
        type: 'post',
        dataType: datatype,
        data: post_data,
        success: function (data) {
            if (!hide_loading) {
                $.endLoad();
            }
            if (datatype == 'json') {
                if (data.ok) {
                    if (fn) fn(data);
                } else {
                    console.error(data.error, url);
                    if (err_fn) err_fn();
                    if (!hide_loading) {
                        Tip(data.error, 'error');
                    }
                }
            } else {
                if (fn) fn(data);
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            if(XMLHttpRequest.readyState == 0){
                console.error('未初始化', url);
                return;
            }
            console.error(XMLHttpRequest.responseText, url);
            if (err_fn) err_fn();
            if (!hide_loading) {
                Tip(t('tips_err_server'), 'error');
                $.endLoad();
            }
        }
    });
}

function getFileSizeStringByInt(size) {
    if (size < 1024) {
        return size + 'B';
    } else if (size < 1024 * 1024) {
        return (size / 1024).toFixed(2) + 'KB';
    } else {
        return (size / 1024 / 1024).toFixed(2) + 'MB';
    }
}

function verifyreq(that) {
    var ok = true;
    var $that = that ? $(that) : $('body');
    $that.find('.req').each(function () {
        var $this = $(this);
        if (($this.val() == '' || $this.val() === null) && ok) {
            ok = false;
            Tip($this.data('name') + t('tips_cant_empty'), 'error');
        }
    });
    return ok;
}

function open_iframe(sel_data, title, url, fn, width) {
    var iframeid = 'open_iframe_' + new Date().getTime();
    var _sel_product = pop.open({
        content: '<iframe id="' + iframeid + '" src="' + url + '" style="width:100%;height:300px;"></iframe>',
        width: width ? width : 600,
        title: title,
        btn2: {
            fn: function () {
                fn(document.getElementById(iframeid).contentWindow[sel_data]);
                _sel_product.close();
            }
        }
    });

}

//默认焦点
function default_focus($form) {
    var $ipt = $form.find('input[type="text"]').eq(0);
    var textValue = $ipt.val();
    $ipt.focus().val(textValue);
}

function submitForm($form, err_fn,success_fn) {
    if (typeof K != 'undefined') {
        K.sync('.xedit_mini');
    }
    if (!verifyreq(this)) {
        return false;
    }
    if ($form.data('fn')) {
        if (!window[$form.data('fn')]()) {
            return false;
        }
    }
    var url = $form.attr('action');
    if (url == '') {
        url = location.href;
    }
    $($form).validation(function () {
        ajax_request(url, $form.serialize(), function (data) {
            Tip(t('tips_success_submit'));
            if(success_fn){
                window[success_fn](data);
            }
            if(data.last_url != '#' && data.last_url != ''){
                setTimeout(function () {
                    location.href = data.last_url;
                }, 300);
            }
        }, 'json', undefined, err_fn);
    }, function () {
        if (err_fn){
            err_fn();
        }
    });
    return false;
}

function uploadFile(pick,options,success_cb) {
    var defaultOptions = {
        formData: {},//{makethumb:1,thumbparam:'{"maxWidth":120,"maxHeight":120,"scale":true,"inflate":true}'}
        fileNumLimit: 1,
        accept: {
            title: 'Images',
            extensions: 'jpg,jpeg,png,gif,bmp'
            //mimeTypes: 'image/*'
        },
        server_url: '/core/upfile/index',
        fileSingleSizeLimit: undefined
    };
    if (!options) {
        options = {};
    }
    options = $.extend(defaultOptions, options);
    var fix = baseUrl + '/common';
    if (typeof baseUrlGroup != 'undefined') {
        fix = baseUrlGroup;
    }
    var uploader = WebUploader.create({
        // swf文件路径
        formData: options.formData,
        swf: baseUrl + '/public/plug/webupload/dist/Uploader.swf',
        // 文件接收服务端。
        server: fix + options.server_url,
        // 选择文件的按钮。可选。
        // 内部根据当前运行是创建，可能是input元素，也可能是flash.
        pick: pick,
        // 不压缩image, 默认如果是jpeg，文件上传前会压缩一把再上传！
        resize: false,
        auto: true,
        accept: options.accept,
        fileNumLimit: options.fileNumLimit,
        fileSingleSizeLimit: options.fileSingleSizeLimit
    });

    uploader.on('beforeFileQueued',function(file){
        if(options.hasOwnProperty('upload_only_one') && options.upload_only_one){
            if(options.hasOwnProperty('is_upload_one') && options.is_upload_one){
                Tip('请等待文件上传完毕，再选择文件', 'error');
                return false;
            }
        }

        options.is_upload_one = true;

        return true;
    });

    uploader.on('uploadStart', function (file) {
        $.startLoad(t('tips_uploading') + 0 + '%');
    });

    uploader.on('uploadProgress', function (file, percentage) {
        var number = parseInt(percentage * 100);
        if (number == 100){
            $.startLoad(t('tips_uploading_handle'));
        }else{
            $.startLoad(t('tips_uploading') + number + '%');
        }
    });

    uploader.on('uploadSuccess', function (file, data) {
        options.is_upload_one = false;

        $.endLoad();
        if (data.ok === false) {
            uploader.removeFile(file, true);
            Tip(data.error, 'error');
            return;
        } else if (data.ok !== true) {
            uploader.removeFile(file, true);
            Tip(t('tips_err_server'), 'error');
            return;
        }
        Tip(t('tips_success_upload'));
        success_cb(file, data);
    });

    uploader.on('uploadError', function (file, reason) {
        options.is_upload_one = false;

        $.endLoad();
        uploader.removeFile(file, true);
        Tip(t('tips_fail_upload') + reason, 'normal');
    });

    var tips_file_max_msg = '';
    if(options.hasOwnProperty('tips_file_max_msg')){
        tips_file_max_msg = options.tips_file_max_msg;
    }

    uploader.on('error', function (type) {
        options.is_upload_one = false;

        $.endLoad();
        if (type == 'Q_EXCEED_NUM_LIMIT') {
            Tip(t('tips_upload_max_num'), 'error');
        } else if (type == 'F_DUPLICATE') {
            Tip(t('tips_upload_repeat'), 'error');
        } else if (type == 'Q_TYPE_DENIED') {
            Tip(t('tips_upload_format'), 'error');
        } else if (type == 'F_EXCEED_SIZE') {
            if(tips_file_max_msg == ''){
                Tip(t('tips_upload_max_size'), 'error');
            }else{
                Tip(tips_file_max_msg, 'error');
            }
        } else {
            Tip(t('tips_fail_upload') + type, 'error');
        }
    });
    return uploader;
}

function reload_element(selector, url, no_tip ,success_fn,fix_selector) {
    if(window.asyn_refresh_list){
        return window.asyn_refresh_list(url,fix_selector);
    }
    if (!url) {
        url = window.location.href
    }
    $.get(url, function (data) {
        var find = $(data).find(selector);
        if (!find.length) {
            find = $(data).filter(selector);
        }
        if (!no_tip) {
            Tip(t('tips_succees_operation'));
        }
        if(fix_selector){
            selector = fix_selector;
        }
        $(selector).html(find.html());
        if (success_fn){
            success_fn(data);
        }
    });
}

/**
 * 登录超时验证
 * 超时则会存入一个标记cookie：login_timeout
 * 使用条件：
 *      1、需要在登录时在根目录存入三个cookie :
 *              core_login_account_account,
 *              core_login_account_name,
 *              core_login_account_company
 *      2、需要增加拦截器
 *              若检测到标记cookie（login_timeout），则进行拦截。
 *              成功拦截后清除掉标记 cookie
 *
 * @param limit_time 超时时间，单位：毫秒，默认600000（即10分钟）
 */
function loginTimer(limit_time) {
    if (limit_time < 1 || !limit_time) {
        limit_time = 600000;
    }
    setTimeout(function () {
        cCookie.set('login_timeout', 'true', {'path': '/'});//设置标记cookie
        var login_timer_popup = pop.view({
            title: t('view_system_tip'),
            closestats: 'hide',
            hideClose: true,
            width: 400,
            content: '<div class="alert-div-content">' +
            '<div style="padding: 10px">' +
            '<div style="padding-bottom: 10px">' + t('view_dear') + cCookie.get('core_login_account_name') + '：</div>' +
            '<div style="margin-bottom: 10px">' + t('view_lock_info') + '</div>' +
            '<input type="password" id="alert-pass" style="width:270px" placeholder="' + t('view_input_pwd') + '">' +
            '<button class="btn logintimer-btn-awake" style="margin-left: 10px">' + t('view_wakeup') + '</button>' +
            '</div>' +
            '</div>'
        });
        var btn_awake = login_timer_popup.$open_widget.find('.logintimer-btn-awake');
        btn_awake.click(function () {
            var pass = login_timer_popup.$open_widget.find('#alert-pass').val();
            var account = cCookie.get('core_login_account_account');
            var company = cCookie.get('core_login_account_company');
            var url = baseUrl + '/admin/core/login/index';
            ajax_request(url, {
                pass: pass,
                pwd: pass,
                password: pass,
                account: account,
                company: company
            }, function (data) {
                login_timer_popup.close();
                loginTimer();
                cCookie.set('login_timeout', null, '/');//清除标记cookie
            }, 'json')
        });
        login_timer_popup.$open_widget.find('#alert-pass').bind('keypress', function (event) {
            if (event.keyCode == '13') {
                btn_awake.click();
            }
        });
    }, limit_time);
}

function isIE() {
    return !!window.ActiveXObject || "ActiveXObject" in window;
}

function is32IE() {
    return isIE() && window.navigator.platform == 'Win32';
}

function isBrowserFullScreen() {
    var explorer = window.navigator.userAgent.toLowerCase();
    if (explorer.indexOf('chrome') > 0) {//chrome
        if (document.body.scrollHeight == window.screen.height && document.body.scrollWidth == window.screen.width) {
            return true;
        }
    } else {//IE 9+  fireFox
        if (window.outerHeight == screen.height && window.outerWidth == screen.width) {
            return true;
        }
    }
    return false;
}
function playAudio(url, loop) {
    // var playSound;
    // var url = this_e.data('url');
    // var voice_horn = this_e.find('.voice_horn');

    if (playAudio.playSound) {
        playAudio.playSound.stop();
        playAudio.playSound.destruct();
    }
    // var width = 6;
    // var voice_horn_interval = setInterval(function(){
    //     voice_horn.css('width',width+'px');
    //     width++;
    //     if(width>12){
    //         width = 6;
    //     }
    // },150);
    var soundManager = new SoundManager();
    soundManager.beginDelayedInit();
    soundManager.setup({
        onready: function() {
            playAudio.playSound = soundManager.createSound({
                id: 'c'+new Date().getTime(),
                url: url,
                onstop: function() {
                    // clearInterval(voice_horn_interval);
                    // voice_horn.css('width','12px');
                },
                onfinish: function() {
                    // clearInterval(voice_horn_interval);
                    // voice_horn.css('width','12px');
                    if(loop){
                        playAudio(url, loop);
                    }
                }
            });
        }
    });
    playAudio.playSound.play();
}

function stopAudio() {
    if (playAudio.playSound) {
        playAudio.playSound.stop();
        playAudio.playSound.destruct();
    }
}
