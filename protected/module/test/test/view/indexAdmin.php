<?php
/**
 * Created by PhpStorm.
 * User: Lee
 * Date: 2018/8/2
 * Time: 17:28
 */

use CC\action\module\basic\tree\DeptTreeJsData;
use CC\util\common\server\AssetManager;
use CC\util\common\widget\panel\ListBodyPanel;
use CC\util\common\widget\panel\ListSearchPanel;
use CC\util\common\widget\panel\ListTablePanel;
use CC\util\common\widget\widget\buttons\ButtonWidget;
use CC\util\common\widget\widget\FilterWidget;
use CC\util\common\widget\widget\ListTableWidget;
use CC\util\common\widget\widget\TreeWidget;
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
        padding: 0;
    }
    .user_dept {  position: relative;  }
    .dept_list {  width: 200px;  float: left;  }
    .user_list {  margin-left: 200px;  }
    .user_level_label_1,.user_level_label_2 {font-size: 12px;display: inline-block; border-radius:3px;color: #fff; background-color: #846bb3; padding:2px 5px; }
    .user_level_label_2 {color: #fff; background-color: #ff695d; }
</style>

<?php
//引入js、css资源
echo AssetManager::instance()->getCssJs([
    '/public/biz/admin/household/js/import.js',
]);
?>
<!--创建顶部操作栏-->
<?php echo WidgetBuilder::build(new FilterWidget($this, ['style' => 'horizontal']), ListSearchPanel::instance()) ?>

<!--新建添加按钮-->
<?php
if ($this->isEditable()) {
    echo ListBodyPanel::instance()->start();
    echo WidgetBuilder::build((new ButtonWidget('add', 'test/edit')));
    echo '<span style="margin-left: 20px;"></span>';
    echo ListBodyPanel::instance()->end();
}
?>

<!--listbodypanel div-->
<?php echo ListBodyPanel::instance()->start() ?>

<div class="user_dept">
<!--    创建树形菜单-->
    <div class="dept_list clearfix">
        <?php echo WidgetBuilder::build(new TreeWidget(
            DeptTreeJsData::instance()->setIsManagerComidCondition(true)->getTreeList(),
            array(
                'editable' => $this->isEditable(), //可编辑
                'edit_url' => $this->genurl('basic/dept/edit'),
                'delete_url' => $this->genurl('basic/dept/delete'),
                'move_url' => $this->genurl('basic/dept/exchange'),
                'name' => '部门',
            )
        )) ?>
    </div>
<!--    渲染查询的用户数据列表-->
    <div class="user_list">
        <?php echo WidgetBuilder::build((new ListTableWidget($this, $list, $page)), ListTablePanel::instance()) ?>
    </div>
</div>
<?php echo ListTablePanel::instance()->end(); ?>
