/**
 * Created by onwer on 2016/12/22.
 */

jQuery(function ($) {

    var $body = $('body');

    //日期
    $body.delegate('.date,.date-time,.time','click',function(){

        var $this = $(this);
        var has_end_min_limit = false;
        var has_end_max_limit = false;
        var end_min_str = '';
        var end_max_str = '';
        var format = 'yyyy-MM-dd';
        if($this.hasClass('date-time')){
            format = 'yyyy-MM-dd HH:mm';
        }else if($this.hasClass('time')){
            format = 'HH:mm';
        }else if($this.hasClass('date-month') || $this.hasClass('date-year')){
            var end_min = $this.attr('end-min');
            var end_max = $this.attr('end-max');
            format = 'yyyy-MM';
            var end_format_str = '%y-%M';
            if($this.hasClass('date-year')){
                format = 'yyyy';
                end_format_str = '%y';
            }
            if(end_min){
                has_end_min_limit = true;
                end_min_str = end_format_str;
            }
            if(end_max){
                has_end_max_limit = true;
                end_max_str = end_format_str;
            }
        }
        var option = {
            dateFmt:format,
            qsEnabled:false
        };

        if(has_end_min_limit){
            option.minDate = end_min_str;
        }

        if(has_end_max_limit){
            option.maxDate = end_max_str;
        }

        var maxEl = $this.attr('date-max-date-el');
        var minEl = $this.attr('date-min-date-el');
        if(maxEl){
            option.maxDate = '#F{$dp.$D(\''+maxEl+'\')}';
        }
        if(minEl){
            option.minDate = '#F{$dp.$D(\''+minEl+'\')}';
        }
        var max = $this.attr('date-max-date');
        var min = $this.attr('date-min-date');
        if(max){
            option.maxDate = max;
        }
        if(min){
            option.minDate = min;
        }
        option.onpicked = function () {
            $(this).trigger('picked');
        };
        WdatePicker(option);
    });


    //表单提交
    $body.on('submit','.normal_form',function(){
        submitForm($(this));
        return false;
    });
    $body.on('click','.sub_btn',function(e){
        var $this = $(this);
        $this.addClass('disabled');
        var $form = $this.closest('form');
        submitForm($form,function(){
            $this.removeClass('disabled');
        },$form.data('success_fn'));
        return false;
    });

    //操作按钮
    $body.delegate('.op_link', 'click', function () {
        var $this = $(this);
        var chooseTr = $this.closest('tr');
        chooseTr.siblings().removeClass('tr_choose');
        chooseTr.addClass('tr_choose');
        pop.confirm($this.data('content'), function () {
            $.startLoad();
            var url = $this.data('href');
            var surl = url.substring(0,url.indexOf('?'));
            var sparams = url.substring(url.indexOf('?')+1,url.length).split('&');
            var params = {};
            for(var i in sparams){
                var sp = sparams[i].split('=');
                params[sp[0]] = sp[1];
            }
            ajax_request(surl,params,function(data){
                if (data.ok) {
                    if ($this.data('success-after')) {
                        window[$this.data('success-after')](data);
                    } else {
                        reload_element('.list-table-panel');
                    }
                } else {
                    Tip(data.error, 'error');
                }
            });
        },function(){
            chooseTr.removeClass('tr_choose');

        },$this.data('title'));
        return false;
    });


    //查看按钮
    $body.delegate('.view_link', 'click', function () {
        var $this = $(this);
        pop.view({
            zdy_class:$this.data('zdy_class'),
            closefn:function(){
                if($this.data('zdy_closefn')){
                    window[$this.data('zdy_closefn')]();
                }
            },
            title: $this.data('title'),
            url:$this.data('href'),
            hideTitle:$this.data('option-hidetitle') == '1',
            width:$this.data('option-width')
        });
        return false;
    });


    //编辑按钮
    $body.delegate('.edit_link', 'click', function () {
        var $this = $(this);
        var options = {
            title: $this.data('title'),
            url: $this.data('href'),
            success:function(){
                default_focus(opten.$open_widget);
            },
            successAfter:function(data){
                if ($this.data('success-after')) {
                    window[$this.data('success-after')](data, $this);
                } else if ($this.data('option-success-after')){
                    window[$this.data('option-success-after')](data);
                } else {
                    reload_element('.list-table-panel');
                }
            }
        };
        if ($this.data('option-width')){
            options['width'] = $this.data('option-width');
        }
        if($this.hasClass('is_open_from_right')){
            options.isFromR = true;
            options.width = 800;
        }
        var opten = pop.editOpen(options);
        return false;
    });

    //异步导出
    $body.delegate('.async_export','click', function () {
        var $this = $(this);


        var url = $this.data('href');
        var surl = url.substring(0,url.indexOf('?'));
        var sparams = url.substring(url.indexOf('?')+1,url.length).split('&');
        var params = {};
        for(var i in sparams){
            var sp = sparams[i].split('=');
            if (sp[1].length > 0){
                params[sp[0]] = decodeURI(sp[1]);
            }
        }
        if ($('.search_form_tag').data('is_asyn') == '1'){
            params = $('.search_form_tag').serialize()+'&is_export=1';
            url = location.pathname+'?'+params;
        }
        if ($(this).data('is_async') != '1'){
            location.href = url;
            return;
        }
        $.startLoad();
        ajax_request(surl, params, function(data){

            if (data.ok) {
                if ($this.data('success-after')) {
                    window[$this.data('success-after')](data);
                }
                var pobj = pop.alert($this.data('content'));
                if ($this.data('async_rst_url')){
                    var requestRst = function () {
                        ajax_request($this.data('async_rst_url'),{task_id:data.task_id},function (rs) {
                            pobj.setContent(rs.content);
                        },'json',true,function () {
                            setTimeout(requestRst,1000);
                        });
                    };
                    requestRst();
                }
            } else {
                Tip(data.error, 'error');
            }
        });
        return false;
    });


    //图片查看
    $body.delegate('.img_view', 'click', function () {
        var imgs = [];
        var $c = $(this);
        var c_index = 0;
        var cur_group = $(this).data('group');
        var group_sel = '';
        if(cur_group){
            group_sel='[data-group="'+cur_group+'"]';
        }
        var index = 0;
        $('.img_view'+group_sel).each(function(i){
            var $this = $(this);
            if(!cur_group && $this.data('group')){
                return;
            }
            if($c.attr('src') == $this.attr('src')){
                c_index = index;
            }
            index++;
            imgs.push($this.data('org')?$this.data('org'):$this.attr('src'));
        });
        $.imgView({
            "imgs":imgs,
            c_index:c_index
        });
        return false;
    });



    //全选
    $body.delegate('.check_all','change',function(){
        var $this = $(this);
        var is_checked = $this.is(':checked');
        var checked = is_checked ? 'checked' : false;
        $('.'+$this.data('class')).prop('checked',checked);
        if(is_checked){
            $('.'+$this.data('class')).find('i').removeClass('icon-2-square-uncheck').addClass('icon-2-square-check1');
        }else{
            $('.'+$this.data('class')).find('i').removeClass('icon-2-square-check1').addClass('icon-2-square-uncheck');
        }
        $this.trigger('check_all_change');
    });

    $body.on('change','input[type="checkbox"]',function(){
        var this_child_e = $(this);
        var calss_str = this_child_e.attr('class');
        if(!calss_str){return;}
        var class_arr = calss_str.split(' ');
        $('.check_all').each(function(){
            var this_all_e = $(this);
            var ipt_class = this_all_e.data('class');
            if(cArr.inArray(ipt_class,class_arr)){
                var is_check = true;
                $('.'+ipt_class).each(function(){
                    if(is_check){
                        is_check = $(this).is(':checked');
                    }
                });
                if(is_check){
                    this_all_e.prop('checked',true);
                }else{
                    this_all_e.prop('checked',false);
                }
            }
        });
        this_child_e.trigger('check_child_change');
    });

    $body.on('click','.table tr',function(){
        var $this = $(this);
        if($this.hasClass('tr_choose')){
            $this.removeClass('tr_choose');
        }else{
            $this.siblings().removeClass('tr_choose');
            $this.addClass('tr_choose');
        }
    });

    $.hoverTips({
        ele:'.x-tip'
    });


    $body.delegate('.tr_checkbox','click',function(){
       var icon = $(this).find('i');
       var ipt = $(this).find('input');

       if(ipt.is(':checked')){
           icon.removeClass('icon-2-square-uncheck').addClass('icon-2-square-check1');
       }else{
           icon.removeClass('icon-2-square-check1').addClass('icon-2-square-uncheck');
       }

       // if(icon.hasClass('icon-2-square-uncheck')){
       //     icon.removeClass('icon-2-square-uncheck').addClass('icon-2-square-check1');
       // }else{
       //     icon.removeClass('icon-2-square-check1').addClass('icon-2-square-uncheck');
       // }
    });

});