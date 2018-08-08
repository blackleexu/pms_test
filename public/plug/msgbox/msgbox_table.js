(function ($) {
    var now_choose_data = {};
    var get_data_url = '';
    var post_data = {};

    $.extend({
        showTable: function (opt) {
            var option = $.extend({
                url: '',
                post_data: {},
                title: '',
                width: 800,
                height: 600,
                choose_data: {},
                is_callback_now: false,
                callback: false
            }, opt);
            if (option['url'] == '') {
                Tip(t('data_source_empty'));
                return false;
            }

            now_choose_data = $.extend(true, {}, option.choose_data);
            get_data_url = option.url;
            post_data = option.post_data;

            $.ajax({
                url: get_data_url,
                type: 'post',
                data: post_data,
                dataType: 'html',
                success: function (res_html) {
                    msgBox.showPro({
                        msg_title: option['title'],
                        box_width: option['width'],
                        box_height: option['height'],
                        box_body: res_html,
                        body_no_padding: true,
                        beforeShow: function () {
                            InitChoose();
                        },
                        is_callback_now: option['is_callback_now'],
                        callback: function (obj, this_btn) {
                            if (option.callback !== false) {
                                option.callback(now_choose_data, obj, this_btn);
                            }
                        }
                    });
                }
            });
        }
    });

    function InitChoose() {
        showChooseNum();

        checkChoose();

        $('#choose_cli_all').click(function () {
            chooseAll($(this));
        });
        $('.choose_cli_child').click(function () {
            choose($(this));
        });
        $('#choose_cli_page_box .pagination a').click(function () {
            var page_key = $('#choose_cli_list_id').attr('page_key');
            var pagenum = $(this).data('pagenum');
            getNewDataList(page_key + '=' + pagenum);
            return false;
        });

        $('#cli_list_search').click(function () {
            getNewDataList();
        });

        $('#cli_list_form').submit(function () {
            getNewDataList();
            return false;
        });
    }

    function showChooseNum() {
        var choose_num = 0;
        for (var cli_id in now_choose_data) {
            choose_num++;
        }
        $('#choose_cli_num').html(choose_num);
    }

    function getNewDataList(search_data) {
        var get_data = $('#cli_list_form').serialize();
        for (var key in post_data) {
            get_data += '&' + key + '=' + post_data[key];
        }
        if (search_data) {
            search_data = '?' + search_data;
        } else {
            search_data = '';
        }
        $.ajax({
            url: get_data_url + search_data,
            type: 'post',
            data: get_data,
            dataType: 'html',
            success: function (res_html) {
                $('#cli_table_box').html($(res_html).find('#cli_table_box').html());
                $('#choose_cli_all').click(function () {
                    chooseAll($(this));
                });
                $('.choose_cli_child').click(function () {
                    choose($(this));
                });
                $('#choose_cli_page_box .pagination a').click(function () {
                    var page_key = $('#choose_cli_list_id').attr('page_key');
                    var pagenum = $(this).data('pagenum');
                    getNewDataList(page_key + '=' + pagenum);
                    return false;
                });

                $('#cli_list_form').submit(function () {
                    getNewDataList();
                    return false;
                });
                checkChoose();
            }
        });
    }

    function checkChoose() {
        var page_all_num = 0;
        var page_choose_num = 0;
        $('.choose_cli_child').each(function () {
            page_all_num++;
            var this_e = $(this);
            var cli_id = this_e.val();
            if (now_choose_data.hasOwnProperty(cli_id)) {
                this_e.prop('checked', true);
                page_choose_num++;
            }
        });
        if (page_all_num > 0 && page_all_num == page_choose_num) {
            $('#choose_cli_all').prop('checked', true);
        }
    }

    function chooseAll(this_e) {
        var checked = this_e.prop('checked');
        $('.choose_cli_child').each(function () {
            var child = $(this);
            if (child.prop('checked') != checked) {
                child.prop('checked', checked);
                if (checked) {
                    addChooseData(child);
                } else {
                    delChooseData(child);
                }
            }
        });
        showChooseNum();
    }

    function choose(this_e) {
        var checked = this_e.prop('checked');
        if (checked) {
            addChooseData(this_e);
        } else {
            delChooseData(this_e);
        }
        showChooseNum();
    }

    function addChooseData(this_e) {
        var cli_id = this_e.val();
        var name = $('#name_' + cli_id).html();
        var location = $('#location_' + cli_id).html();
        now_choose_data[cli_id] = {
            id: cli_id,
            name: name,
            location: location
        };
    }

    function delChooseData(this_e) {
        var cli_id = this_e.val();
        if (now_choose_data.hasOwnProperty(cli_id)) {
            delete now_choose_data[cli_id];
        }
    }
})($);