/**
 * Created by fu.
 * Date: 2016/12/25
 * Time: 15:29
 */
;
(function ($) {

    var validate_wait = [];
    $.fn.validation = function (fn,err_fn) {
        validate_wait = [];
        var $this = $(this);
        $this = $this.find('input, textarea, select');
        if(fn){
            $this.each(function(){
                return validate.call(this);
            });
            if(validate_wait.length == 0){
                fn();
            }else{
                if(err_fn) err_fn();
            }
        }else{
            $this.off('blur.f select.f focus.f').on('blur.f select.f', validate)
                .on('focus.f', clear);
        }
    };


    function validate() {
        var $this = $(this);
        var success = new $.Callbacks();
        var fail = new $.Callbacks();
        var warning = new $.Callbacks();
        var $parent = $this.closest('.form-group');
        success.add(function (value) {
            successHandler.call($this, value);
        });
        fail.add(function (value) {
            failHandler.call($this, value);
        });
        warning.add(function (value) {
            warningHandler.call($this, value);
        });
        var checkerstr = $this.attr('data-checker');
        if (checkerstr) {
            var checkers = JSON.parse(checkerstr);

            for (var i in
                    checkers) {
                var checker = checkers[i];
                $parent.addClass('waiting');
                validate_wait.push($this);
                if (!pickStrategy(checker, $this, success, fail, warning)) {
                    return false;
                }
            }
        }
        return true;
    }

    function clear() {
        var $this = $(this);
        var $parent = $this.closest('.row-group');
        if (!$parent.attr('data-for') || $parent.attr('data-for') === $this.prop('name')) {
            $parent.attr('data-for', null).removeClass('has-error waiting has-warning').find('.data-error-message').text('');
        }
    }

    function pickStrategy(tokens, scope, success, fail, warning) {
        var name = tokens[0];
        var strategy = $.validation.strategy[name];
        if (strategy) {
            for( var i in tokens.message ){
                tokens.message[i] = tokens.message[i].replace('{label}',scope.attr('data-label'));
            }
            return strategy.call(scope, tokens, success, fail, warning);
        }
        else {
            console.error('undefined checker '+name);
            success.fire();
            return true;
        }
    }

    function successHandler() {
        for(var i in validate_wait){
            if(validate_wait[i] == this){
                validate_wait.splice(i, 1);
                break;
            }
        }
        clear.call(this);
    }

    function failHandler(msg) {
        var $parent = this.closest('.row-group');
        var $message = $parent.removeClass('has-warning waiting').addClass('has-error').
            attr('data-for', this.prop('name')).find('.data-error-message');
        var closest = this.closest('.contact_more_hide');
        if (closest.length){
            closest.removeClass('contact_more_hide');
            $('.show_more_contact').html('收起');
        }
        this.focus();
        Tip(msg, 'error');
    }

    function warningHandler(msg) {
        var $parent = this.closest('.form-group');
        $parent.removeClass('waiting').addClass('has-warning').
            attr('data-for', this.prop('name')).find('.help-block').text(msg);
    }

    // Static method.
    $.validation = function (condition, process) {
        $.validation.strategy[condition] = process;
    };

    $.validation.constants = {
        'request': /./,
        'trimLeft': /^\s+/,
        'trimRight': /\s+$/,
        'trim': /(^\s+)|(\s+$)/g,
        'number': /^-?\d+(,\d{3,4})*(\.\d+)?$/,
        'purenumber': /^\d+$/,
        'shenfenzheng': /^\d{17}[\dx]$/i,
        'taibaozheng': /^\d{8}(\d{2})?$/,
        'zhizhao': /^\d{15}$/,
        'mobile': /^1[345789]\d{9}$/,
        'telephone': /^\d{7,8}([ +-]\d+)?$/,
        'email': /^[a-z0-9.\-_+]+@[a-z0-9\-_]+(.[a-z0-9\-_]+)+$/i,
        'url': /^(https?:\/\/)(([\d]{1,3}\.){3}[\d]{1,3}|([\d\w_!~*\\'()-]+\.)*([\d\w][\d\w-]{0,61})?[\d\w]\.[\w]{2,6})(:[\d]{1,4})?((\/?)|(\/[\d\w_!~*\\'().;?:@&=+$,%#-]+)+\/?)$/
    };

    $.validation.strategy = {
        'must': function (params, success, fail) {
            var msg = params.message[0];
            if (this.is("[type=checkbox]") || this.is("[type=radio]")) {
                var name = this.attr("name");
                if (name) {
                    if ($("[name=" + name + "]:checked").length) {
                        success.fire();
                        return true;
                    }
                    else {
                        fail.fire(msg);
                        return false;
                    }
                }
                else {
                    success.fire();
                    return true;
                }
            }
            else {
                if ($.validation.constants.request.test(this.val()) && this.val() != '[]') {
                    success.fire();
                    return true;
                }
                fail.fire(msg);
                return false;
            }
        },
        'len': function (params, success, fail) {
            if (this.val() === '') {
                success.fire();
                return true;
            }
            var min = params.min;
            var val_len = this.val().length;
            if (min) {
                if (val_len < min) {
                    fail.fire(params.message[0].replace('{min}',min));
                    return false;
                }
            }
            var max = params.max;
            if (max) {
                if (val_len > max) {
                    fail.fire(params.message[1].replace('{max}',max));
                    return false;
                }
            }
            success.fire();
            return true;
        },
        'max': function (condition, success, fail) {
            var length = +(condition && condition[0]);
            if (length) {
                if (this.val().length <= length) {
                    success.fire();
                    return true;
                }
                else {
                    fail.fire('不能超过' + length + '个字！');
                    return false;
                }
            }
            else {
                success.fire();
                return true;
            }
        },
        'int': function (params, success, fail) {
            var value = this.val();
            if (value === '') {
                success.fire();
                return true;
            }
            if (!$.validation.constants.purenumber.test(value)) {
                fail.fire(params.message[0]);
                return false;
            }
            if (params.min != undefined && value * 1 < params.min) {
                fail.fire(params.message[1].replace('{min}', params.min));
                return false;
            }
            if (params.max != undefined && value * 1 > params.max) {
                fail.fire(params.message[2].replace('{max}', params.max));
                return false;
            }
            success.fire();
            return true;
        },
        'float': function (params, success, fail) {
            var value = this.val();
            if (value === '') {
                success.fire();
                return true;
            }
            if (!$.validation.constants.number.test(value)) {
                fail.fire(params.message[0]);
                return false;
            }
            if(params.min != undefined && value*1 < params.min){
                fail.fire(params.message[1].replace('{min}',params.min));
                return false;
            }
            if(params.max != undefined && value*1 > params.max){
                fail.fire(params.message[2].replace('{max}',params.max));
                return false;
            }
            success.fire();
            return true;
        },
        'phone': function (params, success, fail) {
            var value = this.val();
            if (value === '') {
                success.fire();
                return true;
            }
            if (!$.validation.constants.mobile.test(value)) {
                fail.fire(params.message[0]);
                return false;
            }
            success.fire();
            return true;
        },
        'url': function (condition, success, fail) {
            var value = this.val();
            if (value === '') {
                success.fire();
                return true;
            }
            if (!$.validation.constants.url.test(value.toLowerCase())) {
                fail.fire('请输入正确的网址！如http://www.baidu.com');
                return false;
            }
            success.fire();
            return true;
        },
        'email': function (params, success, fail) {
            var value = this.val();
            if (value === '') {
                success.fire();
                return true;
            }
            if (!$.validation.constants.email.test(value)) {
                fail.fire(params.message[0]);
                return false;
            }
            success.fire();
            return true;
        },
        'telephone': function (params, success, fail) {
            var value = this.val();
            if (value === '') {
                success.fire();
                return true;
            }
            if (!$.validation.constants.telephone.test(value)) {
                fail.fire(params.message[0]);
                return false;
            }
            success.fire();
            return true;
        },
        'shenfenzheng': function (condition, success, fail) {
            var value = this.val();
            if (value === '') {
                success.fire();
                return true;
            }
            value = value.toLowerCase();
            if ($.validation.constants.shenfenzheng.test(value)) {
                var numbers = value.toLowerCase().split('');
                // 验证地区
                var aCity = {
                    11: '北京',
                    12: '天津',
                    13: '河北',
                    14: '山西',
                    15: '内蒙古',
                    21: '辽宁',
                    22: '吉林',
                    23: '黑龙江',
                    31: '上海',
                    32: '江苏',
                    33: '浙江',
                    34: '安徽',
                    35: '福建',
                    36: '江西',
                    37: '山东',
                    41: '河南',
                    42: '湖北',
                    43: '湖南',
                    44: '广东',
                    45: '广西',
                    46: '海南',
                    50: '重庆',
                    51: '四川',
                    52: '贵州',
                    53: '云南',
                    54: '西藏',
                    61: '陕西',
                    62: '甘肃',
                    63: '青海',
                    64: '宁夏',
                    65: '新疆',
                    71: '台湾',
                    81: '香港',
                    82: '澳门',
                    91: '国外'
                };
                if (!aCity[numbers[0] + numbers[1]]) {
                    fail.fire('身份证格式有误，请检查后重新输入！');
                    return false;
                }
                var wi = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
                var check = ['1', '0', 'x', '9', '8', '7', '6', '5', '4', '3', '2'];
                var _sum = 0;
                for (var i = 0; i < 17; i++) {
                    _sum += +numbers[i] * +wi[i];
                }
                if (numbers[17] != check[_sum % 11]) {
                    fail.fire('身份证格式有误，请检查后重新输入！');
                    return false;
                }
                success.fire();
                return true;
            }
            else {
                fail.fire('请输入18位身份证！');
                return false;
            }
        },
        'taibaozheng': function (condition, success, fail) {
            var value = this.val();
            if (value === '') {
                success.fire();
                return true;
            }
            if (!$.validation.constants.taibaozheng.test(value)) {
                fail.fire('台胞证格式有误，请检查后重新输入！');
                return false;
            }
            success.fire();
            return true;
        },
        'zhizhao': function (condition, success, fail) {
            var value = this.val();
            if (value === '') {
                success.fire();
                return true;
            }
            if ($.validation.constants.zhizhao.test(value)) {
                var p = 10;
                var s;
                var a;
                var numbers = value.split('');
                for (var i = 0; i < 15; i++) {
                    a = +numbers[i];
                    s = (p % 11) + a;
                    p = (s % 10) * 2;
                    if (p === 0) {
                        p = 20;
                    }
                }
                if (s % 10 !== 1) {
                    fail.fire('工商营业执照输入有误，请检查后重新输入！');
                    return false;
                }
                success.fire();
                return true;
            }
            else {
                fail.fire('请输入15位工商营业执照！');
                return false;
            }
        }
    };
}(jQuery));