<?php
/**
 * Created by PhpStorm.
 * User: onwer
 * Date: 2018/2/28
 * Time: 12:22
 */
?>
 <?php if($this->pid):?>
    <?php echo \CC\util\common\widget\widget\WidgetBuilder::build(new \CC\util\common\widget\widget\RetrunBackWidget('',['project_id' => $this->project_id,'pid'=>0])) ?>
  <?php else:?>
    <?php echo \CC\util\common\widget\widget\WidgetBuilder::build(new \CC\util\common\widget\widget\RetrunBackWidget('task/manage/index',['project_id' => $this->project_id])) ?>
 <?php endif;?>

<?php echo \CC\util\common\widget\panel\ListBodyPanel::instance()->start() ?>
<?php echo \CC\util\common\widget\widget\WidgetBuilder::build(new \CC\util\common\widget\widget\buttons\EditAjaxButtonWidget('新建','edit',['project_id' => $this->project_id,'pid' => $this->pid]),\CC\util\common\widget\panel\ListBtnPanel::instance()) ?>

<?php echo \CC\util\common\widget\widget\WidgetBuilder::build(new \CC\util\common\widget\widget\ListTableWidget($this,$list,$page),\CC\util\common\widget\panel\ListTablePanel::instance()) ?>
<?php echo \CC\util\common\widget\panel\ListBodyPanel::instance()->end() ?>
