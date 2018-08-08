/**
 * Created by onwer on 2017/2/28.
 */
$(function () {
    //开始，结束请求

    $('.form_act').submit(function () {
        var $this = $(this);
        var ok = true;
        $('.req').each(function () {
            if ($(this).val() == '' && ok) {
                Tip($(this).data('name') + t('tips_cant_empty'), 'error');
                ok = false;
                $(this).focus();
            }
        });
        if (ok) {
            login($this);
        }
        return false;
    });
    function login($this) {
        $.ajax({
            url: $this.attr('action'),
            type: 'post',
            dataType: 'json',
            data: $this.serialize(),
            success: function (data) {
                if (!data['ok']) {
                    Tip(data['error'], 'error');
                } else {
                    location.href = data.url;
                }
            },
            error: function () {
                Tip(t('tips_err_server'), 'error');
            }
        });

    }
});
