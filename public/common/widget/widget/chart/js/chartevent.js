/**
 * Created by Administrator on 2017/2/8.
 */
$(function () {

    var $body = $('body');

    $body.on('click', '.page_stat_ctimes_lists li', function () {
        var ts = $(this);
        ts.addClass('active').siblings().removeClass('active');
        var cur_type = ts.data('type');
        var cur_tab_name = ts.html();
        ts.parents('.page_stat_cmiddlet').find('.cur_tab_name').html(cur_tab_name);
        //判断
        if (cur_type === 'zdy') {
            ts.parents('.page_stat_cmiddlet').find('.page_times').show();
            ts.parents('.page_stat_cmiddlet').find('.page_stat_tit2').hide();
            ts.parents('.page_stat_cmiddlet').find('.page_stat_tit2').addClass('pic1_text');
        } else {
            ts.parents('.page_stat_cmiddlet').find('.page_times').hide();
            ts.parents('.page_stat_cmiddlet').find('.page_stat_tit2').show();
            ts.parents('.page_stat_cmiddlet').find('.page_stat_tit2').removeClass('pic1_text');
            var chart = window[$(this).closest('.page_stat_con').data('chart')];
            chart.setSearchParams({
                type: cur_type
            });
            chart.refresh();
        }
    });


    $body.on('click', '.page_search', function () {
        var ts = $(this);
        var start_time = ts.parent().find('input[name=start_time]').val();
        var end_time = ts.parent().find('input[name=end_time]').val();
        if (!start_time || !end_time) {
            Tip(t('view_input_date'), 'error');
            return;
        }
        var s = new Date(start_time.replace(/\-/g, "\/"));
        var e = new Date(end_time.replace(/\-/g, "\/"));
        if (s > e) {
            Tip(t('tips_date_range'), 'error');
            return;
        }
        var cur_type = 'zdy';
        var chart = window[$(this).closest('.page_stat_con').data('chart')];
        chart.setSearchParams({
            'type': cur_type,
            'start_time': start_time,
            'end_time': end_time
        });
        chart.refresh();

    });

    $body.on('click', '.page_stat_dc', function () {
        var ts = $(this);
        var title = ts.prev().html();
        var chart = window[$(this).closest('.page_stat_con').data('chart')];
        var url = chart.data_form_url;
        var post_data = {};
        post_data = $.extend(post_data, chart.searchParams);
        post_data['is_export'] = 1;
        post_data['title'] = title;
        ajax_request(url, post_data, function (data) {
            window.location.href = data.url;
        });
    });


    $body.on('click', '.page_stat_btn', function () {
        var w = $(this).data('width');
        var h = $(this).data('height');
        var new_page_stat_con = $(this).closest('.page_stat_con').clone();
        new_page_stat_con.addClass('page_stat_full');
        var chart_name = new_page_stat_con.data('chart');
        var chart_class = chart_name + '_full';
        new_page_stat_con.removeClass(chart_name).addClass(chart_class);
        var chart = window[chart_name];
        new_page_stat_con.data('chart', chart_class);
        var pics_contain = new_page_stat_con.find('.pics_contain');
        var pic_full = pics_contain.attr('id') + '_full';
        pics_contain.attr('id', pic_full);
        var zoom_pop = pop.view({
            hideTitle: true,
            content: new_page_stat_con,
            width: w,
            height: h,
        });
        var new_chart = new chartWidget(pic_full, chart.data_form_url, chart_class, chart.initFnDefault);
        new_chart.setSearchParams(chart.searchParams);
        new_chart.exec(chart.exec_option);
        window[chart_class] = new_chart;

    });

});