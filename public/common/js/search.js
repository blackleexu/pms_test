//<div class="search_tips_box">
//    <span class="search_title">客户名称：</span>
//    <div class="search_input">
//        <input value="<?php echo $model['name']; ?>" name="clientele[name]" class="tips_user_input" type="text">
//        <div class="tips_box">
//            <ul id="search_ul"></ul>
//        </div>
//    </div>
//</div>

var Admin = {};
Admin.search = function(url,search_id,callback){
    var list_ul = $('#'+search_id);
    var tips_box = list_ul.parent();
    var search_obj = {
        url: url,
        list_ul: list_ul,
        tips_box: tips_box,
        input_e: tips_box.prev(),
        active_e: null,
        callback: callback?callback:false
    };
    search_obj.input_e.keyup(function (e) {
        if (e.keyCode == 40 || e.keyCode == 38 || e.keyCode == 13 || e.keyCode == 37 || e.keyCode == 39) {
            return false;
        }
        var search_key = search_obj.input_e.val();
        if (search_key != '') {
            $.get(search_obj.url,{key:search_key},function(res_data){
                var tips_html = '';
                for(var id in res_data.list){
                    tips_html += '<li data-id="'+id+'">'+res_data.list[id]+'</li>';
                }
                if(tips_html == ''){
                    tips_html = '没有查询到';
                }
                search_obj.list_ul.html(tips_html);
                search_obj.list_ul.find('li').bind('click',function(){
                    selectData($(this));
                }).hover(function(){
                    search_obj.list_ul.find('li.active').removeClass('active');
                    search_obj.active_e = $(this);
                    search_obj.active_e.addClass('active');
                });
            },'json');
            var min_width = search_obj.input_e.outerWidth();
            search_obj.tips_box.css('min-width',min_width+'px');
            search_obj.tips_box.show();
            $('body').bind('click.admin_search',function(e){
                $('body').unbind('click.admin_search');
                search_obj.tips_box.hide();
            });
        }
        return false;
    }).keydown(function (e) {
        if (e.keyCode == 40) {
            finddata('next');
            return false;
        }
        if (e.keyCode == 38) {
            finddata('prev');
            return false;
        }
        if (e.keyCode == 13) {
            if (search_obj.active_e && search_obj.active_e.length) {
                selectData(search_obj.active_e);
            }
            return false;
        }
    });
    function finddata(where) {
        var $lis = search_obj.list_ul.find('li');
        if ($lis.length) {
            var $tmpli = $lis.filter('.active');
            if (!$tmpli.length) {
                search_obj.active_e = $lis.eq(0);
                search_obj.active_e.addClass('active');
            } else {
                $tmpli.removeClass('active');
                search_obj.active_e = $tmpli[where]().addClass('active');
            }
        }
    }
    function selectData($li) {
        search_obj.tips_box.hide();
        var id = $li.attr('data-id');
        var name = $li.text();
        if(search_obj.callback){
            search_obj.callback(id,name);
        }else{
            search_obj.input_e.val(name);
        }
    }
};