/**
 * Created by onwer on 2017/2/21.
 */
function widget_pics_upload(id,name,max_num,thumb_params,makethumb,url_key,thumburl_key,cur_val,is_file,options){





    var $file_w = $('#s_pics_input_file_w'+name);
    var pic_val = [];

    var fileCount = options.has_pic_num;

    var setVal = function(){
        if(max_num > 1){
            pic_val = [];
        }else{
            pic_val = '';
        }
        $file_w.find('.s_pics_file').each(function(){
            var val;
            if (is_file){
                val = {};
                val[url_key] = $(this).attr('data-url');
                val[thumburl_key] = $(this).text();
            }else{
                if(makethumb){
                    val = {};
                    val[url_key] = $(this).find('img').attr('data-url');
                    val[thumburl_key] = $(this).find('img').attr('src');
                }else{
                    val = $(this).find('img').attr('src');
                }
            }
            if(max_num > 1){
                pic_val.push(val);
            }else{
                pic_val = val;
            }
        });
        if(max_num > 1 || makethumb || is_file) {
            $('#'+id).val(JSON.stringify(pic_val));
        }else{
            $('#'+id).val(pic_val);
        }
    };
    var createHtml = function (file,data) {
        var $tpl = $($('#s_pics_input_file_w_tpl'+name).html());
        $tpl.attr('data-file_id', file.id);
        if(is_file){
            $tpl.find('.s_pics_file').text(data.filename).attr('data-url', data.url);
        }else{
            if (makethumb) {
                $tpl.find('.s_pics_file img').attr('src', data.thumburl).attr('data-url', data.url);
            } else {
                $tpl.find('.s_pics_file img').attr('src', data.url);
            }
        }

        $file_w.show();
        if (max_num == 1) {
            var fileId = $file_w.find('.s_pics_img_w').data('file_id');
            if (fileId) {
                up.removeFile(fileId);
            }
            console.log($tpl);
            $file_w.html($tpl);
        } else {
            $file_w.append($tpl);
        }
    };
    if(cur_val){
        var cur_val_arr = [];
        if(max_num == 1 && !makethumb && !is_file){
            cur_val_arr = [cur_val];
        }else if(max_num == 1){
            cur_val_arr = [JSON.parse(cur_val)];
        }else{
            cur_val_arr = JSON.parse(cur_val);
        }
        for(var i in cur_val_arr){
            if (is_file){
                createHtml({},cur_val_arr[i]);
            }else if(makethumb){
                createHtml({},{url:cur_val_arr[i][url_key],thumburl:cur_val_arr[i][thumburl_key]});
            }else{
                createHtml({},{url:cur_val_arr[i]});
            }
        }
    }
    var doptions = {
        fileNumLimit:max_num == 1?99:max_num,
        formData:{makethumb:makethumb,
            thumbparam:thumb_params
        },
        upload_only_one: false
    };
    if(options.hasOwnProperty('upload_only_one')){
        doptions.upload_only_one = options.upload_only_one;
    }
    if(options.hasOwnProperty('server_url')){
        doptions.server_url = options.server_url;
    }
    if(options.hasOwnProperty('fileSingleSizeLimit')){
        doptions.fileSingleSizeLimit = options.fileSingleSizeLimit;
    }
    if (is_file){
        doptions.accept = {
            extensions:options.ext
        };
    }



    var web_uploader_pick = {
        id : '#s_pics_input_sel'+name,
        multiple : true
    };

    if(options.hasOwnProperty('pick_multiple')){
        web_uploader_pick.multiple = options.pick_multiple;
    }

    if(options.hasOwnProperty('tips_file_max_msg')){
        doptions.tips_file_max_msg = options.tips_file_max_msg;
    }

    var up = uploadFile(web_uploader_pick,doptions,function(file, data){

        createHtml(file,data);
        setVal();
        if (options.hasOwnProperty('success_callback') && typeof(window[options.success_callback]) == "function") {
            window[options.success_callback](file,data);
        }

    });

    up.addButton({
        id:"#s_pics_"+id,
        innerHTML:'<i class="iconfont icon-2-add-big"></i>'
    });

    up.onBeforeFileQueued = function() {
        if(max_num > 1 && fileCount >= max_num){
            Tip('超出最大上传数量','error');
            return false;
        }

    };
    up.onFileQueued = function() {
        fileCount++;
        if ( fileCount === 1 ) {
            $('body').find('.s_pics_btn_'+id).hide();
            $('body').find('.s_pics_add_'+id).css('display','inline-block');
            $('body').find('.s_pics_show_'+id).css('display','inline-block');

        }

        if(max_num == 1){
            $('body').find('.s_pics_btn_'+id).hide();
            $('body').find('.s_pics_add_'+id).hide();
        }
        $('.num_'+id).html(fileCount);
    };


    
    $file_w.on('click','.s_pics_close',function(){
        fileCount--;

        var $img_w = $(this).closest('.s_pics_img_w');
        var fileId = $img_w.data('file_id');
        if(fileId){
            up.removeFile(fileId);
        }
        $img_w.remove();

        if(!fileCount){
            $('body').find('.s_pics_btn_'+id).show();
            $('body').find('.s_pics_add_'+id).hide();
            $('body').find('.s_pics_show_'+id).hide();
        }
        setVal();
        $('.num_'+id).html(fileCount);
    });

}
