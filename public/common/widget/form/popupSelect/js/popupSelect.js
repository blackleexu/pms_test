function widget_popup_select(name, list_url, options) {
    var success_callback = options.success_callback;
    var option = {};
    option.window_title = options.window_title ? options.window_title : '列表';
    option.button_title = options.button_title ? options.button_title : '选择';
    option.btn1_title = options.btn1_title ? options.btn1_title : '取消';
    option.btn2_title = options.btn2_title ? options.btn2_title : '确定';
    option.width = options.width ? options.width : 800;
    option.height = options.height ? options.height : 400;
    option.input_type = options.input_type ? options.input_type : 'checkbox';
    option.success_callback = options.success_callback ? options.success_callback : '';
    option.show_values = options.show_values ? options.show_values : true;
    option.text_input = options.text_input ? options.text_input : false;
    var buffer = $('#checked_json_' + name);
    var span_elets = $('#show_values_' + name);

    if (option.input_type == 'radio') {
        var selectInputSubmit = function () {
            var buffer_data = JSON.parse(buffer.val());
            for (var i in buffer_data) {
                $('.select_hidden_' + name).val(i);
                if (option.text_input == true) {
                    span_elets.val(buffer_data[i]);
                } else {
                    span_elets.text(buffer_data[i]);
                }
            }
            if ($('.select_hidden_' + name).data('success-after')) {
                window[$('.select_hidden_' + name).data('success-after')]();
            }
            if (success_callback) {
                window[success_callback](buffer_data, window['_sel_need' + name]);
            } else {
                window['_sel_need' + name].close();
            }
        };

        function synchronize_bind() {
            var buffer = $('#checked_json_' + name);
            var doc = $(window.frames["iframe_select"].document);
            doc.find('tbody tr').click(function (e) {
                var $input = $(this).find('input');
                $input.prop('checked', true);
                var buffer_data = {};
                buffer_data[$input.data('id')] = $input.data('name');
                buffer.val(JSON.stringify(buffer_data));
            });
        }

        function synchronize_match() {
            var buffer = $('#checked_json_' + name);
            var buffer_data = JSON.parse(buffer.val());
            var doc = $(window.frames["iframe_select"].document);
            doc.find('.choose_child').each(function () {
                for (var i in buffer_data) {
                    if ($(this).data('id') == i) {
                        this['checked'] = true;
                    }
                }
            });
        }
    } else {
        var selectInputSubmit = function () {
            var list = {};
            if (buffer.val() != '""') {
                list = JSON.parse(buffer.val());
            }
            var ids = '';
            var values = '';
            for (var key in list) {
                ids += ',' + key;
                values += ',' + list[key];
            }
            ids = ids.substr(1, ids.length);
            $('.select_hidden_' + name).val(ids);
            values = values.substr(1, values.length);

            if (option.text_input == true) {
                span_elets.val(values);
            } else {
                span_elets.text(values);
            }

            if ($('.select_hidden_' + name).data('success-after')) {
                window[$('.select_hidden_' + name).data('success-after')]();
            }
            if (success_callback) {
                window[success_callback](ids, window['_sel_need' + name]);
            } else {
                window['_sel_need' + name].close();
            }
        };
        var synchronize_bind = function () {
            var buffer = $('#checked_json_' + name);
            var doc = $(window.frames["iframe_select"].document);
            doc.find('tbody tr').click(function (e) {
                var list = {};
                if (buffer.val() != '""') {
                    list = JSON.parse(buffer.val());
                }
                var $input = $(this).find('input');
                if (!$(e.target).hasClass('choose_child')) {
                    if ($input[0]['checked']) {
                        $input.prop('checked', false);
                        delete list[$input.data('id')];
                    } else {
                        $input.prop('checked', true);
                        list[$input.data('id')] = $input.data('name');
                    }
                } else {
                    if ($input[0]['checked']) {
                        list[$input.data('id')] = $input.data('name');
                    } else {
                        delete list[$input.data('id')];
                    }
                }
                buffer.val(JSON.stringify(list));
                isAllChecked();
            });

            doc.find('.check_all').change(function () {
                var all_list = {};
                if (buffer.val() != '""') {
                    all_list = JSON.parse(buffer.val());
                }

                var list = {};
                if (this['checked']) {
                    doc.find('.choose_child').each(function () {
                        list[$(this).data('id')] = $(this).data('name');
                        this['checked'] = true;
                    });
                } else {
                    doc.find('.choose_child').each(function () {
                        delete all_list[$(this).data('id')];
                        this['checked'] = false;
                    });
                }
                buffer.val(JSON.stringify($.extend(all_list, list)));
            });
        };

        var synchronize_match = function () {
            var buffer = $('#checked_json_' + name);
            var doc = $(window.frames["iframe_select"].document);
            var list = {};
            if (buffer.val() != '""') {
                list = JSON.parse(buffer.val());
            }
            doc.find('.choose_child').each(function () {
                for (var key in list) {
                    ($(this).data('id') == key) && (this['checked'] = true);
                }
            });
            isAllChecked();
        };
        var isAllChecked = function () {
            var doc = $(window.frames["iframe_select"].document);
            var $check_all = doc.find('.check_all');
            if (doc.find('.choose_child:not(:checked)').length == 0) {
                $check_all.prop('checked', 'true');
            } else {
                $check_all.attr('checked', false);
            }
        };
    }
    $('.select_'+name).click(function () {
        var data_url = $(buffer).data('url');
        var url = data_url ? data_url : list_url;
        var iframe = '<iframe name="iframe_select" src="' + url + '" style="width:100%;height:' + option.height + 'px;" onload="synchronize_' + name + '()"></iframe>';
        window['_sel_need' + name] = pop.open({
            content: iframe,
            width: option.width,
            title: option.window_title,
            btn1: {
                name: option.btn1_title
            },
            btn2: {
                name: option.btn2_title,
                fn: selectInputSubmit
            },
            success: function () {
            }
        });
    });
    window['synchronize_' + name] = function () {
        synchronize_bind();
        synchronize_match();
    };

}
