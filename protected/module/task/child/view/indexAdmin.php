<?php
/**
 * Created by PhpStorm.
 * User: jesse
 * Date: 2018/4/13
 * Time: 14:14
 */
?>
<div class="create_child_task">
    <?php $pid = CC::app()->request->getParams('pid');
    echo \CC\util\common\widget\widget\WidgetBuilder::build(
        (new \CC\util\common\widget\widget\buttons\EditAjaxButtonWidget('添加子任务', 'task/child/insert', ['pid' => $pid,'close-parent-window' => true]))->setAttributes(array(
            'data-option-list-tabel-id' => 'child_list',
            'data-reload_url' => $this->genurl('',['pid' => $pid]),
        )),
        \CC\util\common\widget\panel\ListBtnPanel::instance())?>
</div>
<div id="child_list">
    <?php echo \CC\util\common\widget\widget\WidgetBuilder::build(new \CC\util\common\widget\widget\ListTableWidget($this, $list, $page,['is_show_page_num' => true]), \CC\util\common\widget\panel\ListTablePanel::instance()) ?>
</div>

<style>
    .list-btn-panel {
        padding: 10px 15px;
    }
</style>