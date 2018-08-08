<?php
/**
 * Created by PhpStorm.
 * User: onwer
 * Date: 2018/2/28
 * Time: 12:22
 */
?>
<div class="project_detail_block">
    <?php echo \CC\util\common\widget\widget\WidgetBuilder::build(new \module\project\index\widget\ProjectNavWidget()) ?>

    <div class="project_detail_cont">
        <div class="project_detail_head">
            <?php echo \CC\util\common\widget\widget\WidgetBuilder::build(new \module\project\dynamic\widget\ProjectDetailWidget($this->project_id)) ?>
            <?php echo \CC\util\common\widget\widget\WidgetBuilder::build(new \module\project\dynamic\widget\ProjectDynamicNavWidget($this->project_id)) ?>
        </div>
        <div class="project_detail_body clearfix">

            <?php echo \CC\util\common\widget\panel\ListBodyPanel::instance()->start() ?>
            <?php echo \CC\util\common\widget\widget\WidgetBuilder::build(new \CC\util\common\widget\widget\buttons\EditAjaxButtonWidget('新建', 'edit', ['project_id' => $this->project_id]), \CC\util\common\widget\panel\ListBtnPanel::instance()) ?>

            <?php echo \CC\util\common\widget\widget\WidgetBuilder::build(new \CC\util\common\widget\widget\ListTableWidget($this, $list, $page), \CC\util\common\widget\panel\ListTablePanel::instance()) ?>
            <?php echo \CC\util\common\widget\panel\ListBodyPanel::instance()->end() ?>
        </div>
    </div>
</div>
