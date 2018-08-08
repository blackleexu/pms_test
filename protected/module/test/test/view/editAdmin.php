<?php
/**
 * Created by PhpStorm.
 * User: Lee
 * Date: 2018/8/6
 * Time: 11:25
 */

use CC\util\common\server\AssetManager;
use CC\util\common\widget\panel\FormPanel;
use CC\util\common\widget\panel\ListBodyPanel;
use CC\util\common\widget\widget\buttons\ButtonWidget;
use CC\util\common\widget\widget\FormWidget;
use CC\util\common\widget\widget\RetrunBackWidget;
use CC\util\common\widget\widget\WidgetBuilder;

?>

<style>
    .search_form_main{
        padding: 0px 0 0px;
        margin-top: 46px;
        height: 50px;
        line-height: 50px;
        background: #18a689;
    }
    .search_child_box{
        padding: 0px 20px 0;
    }
    .header {
        background: #292929;
    }
    .header_user{
        line-height: 0;
    }
    .list-search-panel {
        padding: 0;
    }
    .list-body-panel-inner span{
        left: 90%;
    }
    .content{
        padding: 56px;
    }
</style>

<?php
echo AssetManager::instance()->getCssJs([
    '/public/biz/admin/household/js/import.js',
]);
?>
<!--返回上级页面-->
<?php echo WidgetBuilder::build(new RetrunBackWidget('index')) ?>

<?php echo WidgetBuilder::build(new FormWidget($this,$data), FormPanel::instance()) ?>
<script>
    (function () {
        $('#form_role_id').change(function () {
            var type = $(this).find('option:selected').data('type');
            var $user_level_div = $('.data-group-form_user_level').parents('.row-group');
            $(document.getElementsByName('role_type')).val(type);
            if (type == 1) {
                $user_level_div.hide();
            }else if(type == 2){
                $user_level_div.show();
            }
        });
        $('#form_role_id').change();
    })();
</script>
